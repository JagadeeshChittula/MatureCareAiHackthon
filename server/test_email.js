const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

async function testGmailSmtp() {
  const smtpUser = (process.env.SMTP_USER || process.env.EMAIL_USER || '').trim();
  const emailPass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');

  console.log(`[Testing Gmail SMTP] User: ${smtpUser}, Password Length: ${emailPass.length}`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: emailPass,
    },
  });

  try {
    console.log('Verifying SMTP connection credentials...');
    await transporter.verify();
    console.log('✅ Gmail SMTP Credentials Accepted by Google!');

    console.log('Sending test OTP email to jchittula@gmail.com...');
    const info = await transporter.sendMail({
      from: `"MatruCare AI" <${smtpUser}>`,
      to: 'jchittula@gmail.com',
      subject: 'MatruCare AI — Test OTP Email Verification',
      html: '<h1>Your MatruCare AI OTP is: 123456</h1>',
    });

    console.log('✅ TEST EMAIL SENT SUCCESSFULLY!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  } catch (error) {
    console.error('❌ GMAIL SMTP FAILED:', error.message);
    if (error.response) console.error('SMTP Response:', error.response);
  }
}

testGmailSmtp();
