
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get the authorization token from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header provided' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    // Create authenticated Supabase client using the authorization header
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    })

    // Verify the user is an admin
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    // Get the admin profile
    const { data: adminProfile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !adminProfile || adminProfile.role !== 'admin') {
      console.error('Authentication error:', profileError || 'User is not an admin')
      return new Response(
        JSON.stringify({ error: 'Unauthorized. Only admins can search users.' }),
        { status: 403, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    // Get the search term from the request
    const { searchTerm } = await req.json()
    
    if (!searchTerm || typeof searchTerm !== 'string' || searchTerm.length < 2) {
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

    console.log(`Admin ${user.id} searching users with term: ${searchTerm}`)

    // Search for users matching the term
    const { data: users, error: searchError } = await supabaseClient
      .from('profiles')
      .select('id, full_name, email, role')
      .or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
      .limit(10)

    if (searchError) {
      console.error('Error searching users:', searchError)
      return new Response(
        JSON.stringify({ error: 'Error searching users', details: searchError.message }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    // Return the search results
    return new Response(
      JSON.stringify({ 
        data: users.map(user => ({
          id: user.id,
          fullName: user.full_name || 'Unknown',
          email: user.email || 'No email',
          role: user.role || 'student'
        }))
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
})
