
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'npm:resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get admin emails
    const { data: adminRoles } = await supabase
      .from('user_roles')
      .select('user_id')
      .eq('role', 'admin')

    if (!adminRoles?.length) {
      throw new Error('No admin users found')
    }

    const { data: adminProfiles } = await supabase
      .from('profiles')
      .select('email')
      .in('id', adminRoles.map(role => role.user_id))

    const adminEmails = adminProfiles?.map(profile => profile.email).filter(Boolean) ?? []

    // Get consultation details from request body
    const { consultation } = await req.json()

    // Send email to admins
    const { data: emailResponse, error: emailError } = await resend.emails.send({
      from: 'Consultation Requests <onboarding@resend.dev>',
      to: adminEmails,
      subject: 'New Consultation Request',
      html: `
        <h1>New Consultation Request</h1>
        <p><strong>From:</strong> ${consultation.name}</p>
        <p><strong>Email:</strong> ${consultation.email}</p>
        <p><strong>Phone:</strong> ${consultation.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${consultation.company || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${consultation.message}</p>
      `,
    })

    if (emailError) throw emailError

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
})
