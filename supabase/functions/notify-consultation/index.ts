
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
    const { consultation } = await req.json()

    // Send email to admin
    const { data: emailResponse, error: emailError } = await resend.emails.send({
      from: 'IntelliAI Labs <onboarding@resend.dev>',
      to: ['itelliailabs@gmail.com'], // Replace with your admin email
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

    // Send confirmation email to user
    const { error: userEmailError } = await resend.emails.send({
      from: 'IntelliAI Labs <onboarding@resend.dev>',
      to: [consultation.email],
      subject: 'We received your consultation request',
      html: `
        <h1>Thank you for your consultation request!</h1>
        <p>Dear ${consultation.name},</p>
        <p>We have received your consultation request and our team will review it shortly. 
        We aim to respond within 24-48 business hours.</p>
        <p>Your message: "${consultation.message}"</p>
        <p>Best regards,<br>The IntelliAI Labs Team</p>
      `,
    })

    if (userEmailError) throw userEmailError

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
