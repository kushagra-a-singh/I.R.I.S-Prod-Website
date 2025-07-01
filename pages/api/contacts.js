import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

import nodemailer from 'nodemailer';
import { corsMiddleware } from '../../lib/corsMiddleware';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message, created_at } = req.body;

      const { data, error } = await supabase
        .from('contacts')
        .insert([{ name, email, phone, subject, message, created_at }]);

      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ success: false, error: 'Database insertion error' });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const adminEmailPromise = transporter.sendMail({
        from: `"I.R.I.S. MIT-WPU" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: #f9f9f9;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><strong>Submitted at:</strong> ${new Date(created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'long' })} (IST)</p>
        </div>


        `,
      });

      const userEmailPromise = transporter.sendMail({
        from: `"I.R.I.S. MIT-WPU" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Thank you for contacting us',
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 5px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Thank you for reaching out, ${name}!</h2>
          <p>We have received your message regarding "<strong>${subject}</strong>".</p>
          <p>Someone from our team will contact you soon.</p>
          <p>Best regards,<br>Team I.R.I.S.</p>
        </div>


        `,
      });

      await adminEmailPromise;
      await userEmailPromise;

      res.status(201).json({ success: true, message: 'Message received and emails sent' });
    } catch (err) {
      console.error('Error handling request:', err);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default corsMiddleware(handler);
