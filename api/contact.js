const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, service, budget, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'stephenkington@gmail.com',
      pass: 'acfkinoktrhs zbrq'
    }
  });

  try {
    await transporter.sendMail({
      from: '"ASSET Studio" <stephenkington@gmail.com>',
      to: 'info@weareasset.co.uk',
      replyTo: email,
      subject: `New Project Inquiry from ${name} — ASSET Studio`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px;background:#f9f9f9;">
          <div style="background:#080808;padding:32px;border-radius:4px;margin-bottom:24px;">
            <h1 style="color:#ff2d9b;font-size:24px;margin:0;letter-spacing:0.1em;">NEW PROJECT INQUIRY</h1>
            <p style="color:#888;font-size:12px;margin:8px 0 0;letter-spacing:0.1em;">ASSET STUDIO</p>
          </div>
          <div style="background:#fff;padding:32px;border-radius:4px;border-left:3px solid #ff2d9b;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;width:120px;">Name</td><td style="padding:10px 0;color:#111;font-size:15px;">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Email</td><td style="padding:10px 0;color:#111;font-size:15px;"><a href="mailto:${email}" style="color:#ff2d9b;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Company</td><td style="padding:10px 0;color:#111;font-size:15px;">${company || 'Not provided'}</td></tr>
              <tr><td style="padding:10px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Service</td><td style="padding:10px 0;color:#111;font-size:15px;">${service || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Budget</td><td style="padding:10px 0;color:#111;font-size:15px;">${budget || 'Not specified'}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
            <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px;">Message</p>
            <p style="color:#111;font-size:15px;line-height:1.7;margin:0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color:#aaa;font-size:11px;text-align:center;margin-top:24px;">Sent from weareasset.co.uk contact form</p>
        </div>
      `
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
