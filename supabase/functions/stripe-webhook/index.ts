
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      }
    }
  );

  try {
    // Get the Stripe webhook secret
    const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    if (!stripeWebhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
    }

    // Verify the webhook signature
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('Missing Stripe signature');
    }

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);

    console.log(`Processing Stripe event: ${event.type}`);

    // Handle specific event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { user_id, type, course_id, plan_id } = session.metadata;

        if (type === 'course_purchase') {
          // Handle course purchase
          const courseId = course_id;
          const userId = user_id;

          // Record the payment
          await supabaseClient.from('payments').insert({
            user_id: userId,
            course_id: courseId,
            amount: session.amount_total / 100,
            currency: session.currency,
            status: 'succeeded',
            stripe_checkout_session_id: session.id,
            stripe_charge_id: session.payment_intent,
            metadata: { payment_type: 'course_purchase' }
          });

          // Create enrollment for the course
          await supabaseClient.from('enrollments').insert({
            user_id: userId,
            course_id: courseId
          });

          // Create invoice
          await supabaseClient.from('invoices').insert({
            user_id: userId,
            course_id: courseId,
            amount: session.amount_total / 100,
            currency: session.currency,
            status: 'paid',
            stripe_invoice_id: session.invoice,
            invoice_url: session.invoice_url,
            paid_at: new Date().toISOString()
          });
        } else if (type === 'subscription') {
          // Handle subscription purchase
          const planId = plan_id;
          const userId = user_id;
          const subscriptionId = session.subscription;

          // Get subscription details from Stripe
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);

          // Record the subscription
          await supabaseClient.from('user_subscriptions').insert({
            user_id: userId,
            plan_id: planId,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer
          });
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        const subscription = invoice.subscription;
        
        if (subscription) {
          // Get subscription details
          const subscriptionData = await stripe.subscriptions.retrieve(subscription);
          const customerId = subscriptionData.customer;
          
          // Find the user by Stripe customer ID
          const { data: paymentMethods, error: pmError } = await supabaseClient
            .from('payment_methods')
            .select('user_id')
            .eq('stripe_customer_id', customerId)
            .limit(1);

          if (paymentMethods && paymentMethods.length > 0) {
            const userId = paymentMethods[0].user_id;
            
            // Update subscription status
            await supabaseClient.from('user_subscriptions')
              .update({ 
                status: subscriptionData.status,
                current_period_start: new Date(subscriptionData.current_period_start * 1000).toISOString(),
                current_period_end: new Date(subscriptionData.current_period_end * 1000).toISOString()
              })
              .eq('stripe_subscription_id', subscription);
            
            // Create invoice record
            await supabaseClient.from('invoices').insert({
              user_id: userId,
              subscription_id: subscription,
              amount: invoice.amount_paid / 100,
              currency: invoice.currency,
              status: 'paid',
              stripe_invoice_id: invoice.id,
              invoice_url: invoice.hosted_invoice_url,
              pdf_url: invoice.invoice_pdf,
              paid_at: new Date().toISOString()
            });
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        
        // Update subscription record
        await supabaseClient.from('user_subscriptions')
          .update({
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end
          })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        // Update subscription record
        await supabaseClient.from('user_subscriptions')
          .update({
            status: 'canceled'
          })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }

      case 'payment_method.attached': {
        const paymentMethod = event.data.object;
        const customerId = paymentMethod.customer;
        
        // Find the user by Stripe customer ID
        const { data: users, error: userError } = await supabaseClient
          .from('payment_methods')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .limit(1);
        
        if (users && users.length > 0) {
          const userId = users[0].user_id;
          
          // Add payment method to the database
          await supabaseClient.from('payment_methods').insert({
            user_id: userId,
            stripe_payment_method_id: paymentMethod.id,
            card_brand: paymentMethod.card.brand,
            card_last4: paymentMethod.card.last4,
            card_exp_month: paymentMethod.card.exp_month,
            card_exp_year: paymentMethod.card.exp_year,
            is_default: false
          });
        }
        break;
      }

      case 'payment_method.detached': {
        const paymentMethod = event.data.object;
        
        // Remove payment method from the database
        await supabaseClient.from('payment_methods')
          .delete()
          .eq('stripe_payment_method_id', paymentMethod.id);
        break;
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
