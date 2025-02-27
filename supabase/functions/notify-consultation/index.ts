
// Follow this setup guide to integrate the Deno runtime and the Supabase JS library with your project:
// https://deno.land/manual/npm_nodejs/compatibility_mode
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

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
    console.log('Received request to notify-consultation function')
    const { consultation } = await req.json()
    console.log('Consultation data received:', consultation)

    if (!consultation || !consultation.email || !consultation.name || !consultation.message) {
      throw new Error('Missing required consultation data')
    }

    console.log('Sending admin notification email')
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

    if (emailError) {
      console.error('Error sending admin email:', emailError)
      throw emailError
    }
    
    console.log('Admin email sent successfully:', emailResponse)

    console.log('Sending confirmation email to user')
    // Send confirmation email to user
    const { data: userEmailData, error: userEmailError } = await resend.emails.send({
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

    if (userEmailError) {
      console.error('Error sending user confirmation email:', userEmailError)
      throw userEmailError
    }
    
    console.log('User confirmation email sent successfully:', userEmailData)

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Emails sent successfully' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (error) {
    console.error('Error in notify-consultation function:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
})
