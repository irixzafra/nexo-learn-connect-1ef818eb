
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('🔄 Edge Function search-users-simulation invoked');
    
    // Get request parameters
    let searchBody;
    try {
      searchBody = await req.json();
      console.log('📥 Received request body:', searchBody);
    } catch (error) {
      console.error('❌ Error parsing request body:', error);
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }
    
    const { searchTerm } = searchBody;
    
    if (!searchTerm || typeof searchTerm !== 'string' || searchTerm.length < 2) {
      console.error('❌ Invalid search term:', searchTerm);
      return new Response(
        JSON.stringify({ 
          error: 'Search term must be at least 2 characters',
          data: []
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    console.log(`🔍 Searching users with term: "${searchTerm}"`);

    // Create Supabase client using environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

    // For development purposes, just use the anon key client to search
    // This removes the authentication requirement temporarily
    console.log('🔐 Using anon key client for searching');

    // Search for users matching the term
    const { data: users, error: searchError } = await supabaseClient
      .from('profiles')
      .select('id, full_name, email, role')
      .or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
      .limit(10)

    if (searchError) {
      console.error('❌ Error searching users:', searchError);
      return new Response(
        JSON.stringify({ error: 'Error searching users', details: searchError.message }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    console.log(`✅ Found ${users?.length || 0} users matching search term:`, users);

    // Return the search results
    const formattedUsers = users ? users.map(user => ({
      id: user.id,
      fullName: user.full_name || 'Unknown',
      email: user.email || 'No email',
      role: user.role || 'student'
    })) : [];
    
    console.log('📤 Returning formatted results:', formattedUsers);
    
    return new Response(
      JSON.stringify({ 
        data: formattedUsers
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    )
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
})
