
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
  );

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    // Parse request body
    const { itemType, itemId, successUrl, cancelUrl } = await req.json();

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Get or create the Stripe customer for the user
    const { data: customers, error: customerError } = await supabaseClient
      .from('payment_methods')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .limit(1);

    let customerId = null;
    if (customers && customers.length > 0 && customers[0].stripe_customer_id) {
      customerId = customers[0].stripe_customer_id;
    } else {
      // Create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      });
      customerId = customer.id;
    }

    // Handle different item types (one-time course payment or subscription)
    let session;
    if (itemType === 'course') {
      // Get course details
      const { data: course, error: courseError } = await supabaseClient
        .from('courses')
        .select('title, price, currency')
        .eq('id', itemId)
        .single();

      if (courseError || !course) {
        throw new Error('Curso no encontrado');
      }

      // Create a one-time checkout session for the course
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: course.currency || 'eur',
              product_data: {
                name: course.title,
                description: 'Compra de curso en Nexo Learning',
              },
              unit_amount: Math.round(course.price * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&course_id=${itemId}`,
        cancel_url: cancelUrl,
        metadata: {
          course_id: itemId,
          user_id: user.id,
          type: 'course_purchase',
        },
      });
    } else if (itemType === 'subscription') {
      // Get subscription plan details
      const { data: plan, error: planError } = await supabaseClient
        .from('subscription_plans')
        .select('*')
        .eq('id', itemId)
        .single();

      if (planError || !plan) {
        throw new Error('Plan no encontrado');
      }

      // Check if the user already has an active subscription
      const { data: existingSubscription, error: subscriptionError } = await supabaseClient
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (existingSubscription) {
        // Create a checkout session for updating the subscription
        session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ['card'],
          mode: 'subscription',
          success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&plan_id=${itemId}`,
          cancel_url: cancelUrl,
          line_items: [
            {
              price_data: {
                currency: plan.currency,
                product_data: {
                  name: plan.name,
                  description: plan.description,
                },
                unit_amount: Math.round(plan.price * 100),
                recurring: {
                  interval: plan.interval,
                },
              },
              quantity: 1,
            },
          ],
          metadata: {
            plan_id: itemId,
            user_id: user.id,
            type: 'subscription',
          },
        });
      } else {
        // Create a checkout session for a new subscription
        session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ['card'],
          mode: 'subscription',
          success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&plan_id=${itemId}`,
          cancel_url: cancelUrl,
          line_items: [
            {
              price_data: {
                currency: plan.currency,
                product_data: {
                  name: plan.name,
                  description: plan.description,
                },
                unit_amount: Math.round(plan.price * 100),
                recurring: {
                  interval: plan.interval,
                },
              },
              quantity: 1,
            },
          ],
          metadata: {
            plan_id: itemId,
            user_id: user.id,
            type: 'subscription',
          },
        });
      }
    } else {
      throw new Error('Tipo de item no válido');
    }

    return new Response(
      JSON.stringify({ url: session.url, session_id: session.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
