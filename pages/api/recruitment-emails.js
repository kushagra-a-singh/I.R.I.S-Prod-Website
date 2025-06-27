import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { corsMiddleware } from '../../lib/corsMiddleware';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { 
        name, 
        prn, 
        email, 
        phone, 
        domain, 
        interests, 
        experience, 
        contribution, 
        cv_url, 
        school, 
        branch, 
        currentYear,
        created_at
      } = req.body;

      // Setup email transport
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      // Format domains array for readability
      const domainsList = Array.isArray(domain) 
        ? domain.join(', ')
        : domain;

      // Send email to admin
      const adminEmailPromise = transporter.sendMail({
        from: `"I.R.I.S. MIT-WPU" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Recruitment Application: ${name}`,
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: #f9f9f9;">
          <h2 style="color: #333;">New Recruitment Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>PRN:</strong> ${prn}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>School:</strong> ${school}</p>
          <p><strong>Branch:</strong> ${branch}</p>
          <p><strong>Current Year:</strong> ${currentYear}</p>
          <p><strong>Domain(s):</strong> ${domainsList}</p>
          <p><strong>Interests:</strong> ${interests}</p>
          <p><strong>Experience:</strong> ${experience}</p>
          <p><strong>Why join IRIS:</strong> ${contribution}</p>
          ${cv_url ? `<p><strong>Resume:</strong> <a href="${cv_url}" target="_blank">View Resume</a></p>` : '<p><strong>Resume:</strong> Not provided</p>'}
          <p><strong>Submitted at:</strong> ${new Date(created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'long' })} (IST)</p>
        </div>
        `,
      });

      // Send confirmation email to applicant
      const userEmailPromise = transporter.sendMail({
        from: `"I.R.I.S. MIT-WPU" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Thank you for your application to I.R.I.S.',
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Thank you for applying, ${name}!</h2>
          <p>We have received your application to join I.R.I.S. in the following domain(s):</p>
          <p><strong>${domainsList}</strong></p>
          <p>Our team will review your application and get back to you soon about the next steps.</p>
          <p>If you have any questions in the meantime, please feel free to reply to this email.</p>
          <p>Best regards,<br>Team I.R.I.S.</p>
        </div>
        `,
      });

      // Wait for both emails to be sent
      await Promise.all([adminEmailPromise, userEmailPromise]);
      
      // Return success response
      res.status(200).json({ success: true, message: 'Application received and emails sent' });
    } catch (err) {
      console.error('Error handling request:', err);
      res.status(500).json({ success: false, error: err.message || 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default corsMiddleware(handler);
