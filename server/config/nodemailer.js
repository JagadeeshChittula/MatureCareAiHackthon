const nodemailer = require('nodemailer');

const createTransporter = () => {
  const emailUser = (process.env.EMAIL_USER || 'matrucareai@gmail.com').trim();
  const emailPass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');

  if (emailPass && emailPass !== 'your_gmail_app_password') {
    return nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });
  }

  return null;
};

const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = createTransporter();
  const emailUser = (process.env.EMAIL_USER || 'matrucareai@gmail.com').trim();
  const fromAddress = `"${process.env.EMAIL_SENDER_NAME || 'MatruCare AI'}" <${emailUser}>`;

  if (transporter) {
    try {
      const mailOptions = {
        from: fromAddress,
        to,
        subject,
        html,
        text: text || 'MatruCare AI Notification',
      };
      const info = await transporter.sendMail(mailOptions);
      console.log(`[Email Sent Successfully via Nodemailer]: ${info.messageId} to ${to}`);
      return { delivered: true, messageId: info.messageId };
    } catch (error) {
      console.warn(`[Nodemailer SMTP Notice]: Real email dispatch failed (${error.message}). Fallback to Dev Mode console & UI logger.`);
    }
  }

  // Graceful Fallback Logger
  console.log('----------------------------------------------------');
  console.log('[DEV MODE EMAIL LOGGER — MatruCare AI]');
  console.log(`From: "${fromAddress}"`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log('----------------------------------------------------');

  return { delivered: false, messageId: 'dev-mode-fallback-id' };
};

module.exports = { sendEmail };
