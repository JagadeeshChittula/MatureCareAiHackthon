/**
 * Email templates for MatruCare AI Hackathon Portal
 */

const getOtpEmailTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
        .container { max-width: 550px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 32px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .header { text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 16px; margin-bottom: 24px; }
        .logo { font-size: 24px; font-weight: 800; color: #38bdf8; letter-spacing: 1px; }
        .subtitle { font-size: 14px; color: #94a3b8; margin-top: 4px; }
        .content { text-align: center; line-height: 1.6; }
        .otp-box { background: #0f172a; border: 2px dashed #38bdf8; border-radius: 8px; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #38bdf8; padding: 16px; margin: 24px 0; display: inline-block; width: 80%; }
        .notice { font-size: 13px; color: #cbd5e1; background: #334155; padding: 12px; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #64748b; border-top: 1px solid #334155; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">MatruCare AI</div>
          <div class="subtitle">Hackathon Registration Portal — Identity Verification</div>
        </div>
        <div class="content">
          <h2 style="color: #ffffff; margin-bottom: 8px;">Verify Your Email Address</h2>
          <p style="color: #94a3b8; font-size: 15px;">Thank you for registering for the MatruCare AI National Hackathon 2026. Please use the verification code below to complete your signup.</p>
          
          <div class="otp-box">${otp}</div>
          
          <p style="color: #f43f5e; font-weight: 600; font-size: 14px;">⏱️ This verification code is valid for 10 minutes only.</p>
          
          <div class="notice">
            If you did not initiate this request, please ignore this email or contact support at <a href="mailto:matrucareai@gmail.com" style="color: #38bdf8; text-decoration: none;">matrucareai@gmail.com</a>.
          </div>
        </div>
        <div class="footer">
          &copy; 2026 MatruCare AI Internship Programme. All rights reserved.<br>
          MatruCare AI • Official Hackathon Portal
        </div>
      </div>
    </body>
    </html>
  `;
};

const getPasswordResetEmailTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
        .container { max-width: 550px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 32px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .header { text-align: center; border-bottom: 2px solid #8b5cf6; padding-bottom: 16px; margin-bottom: 24px; }
        .logo { font-size: 24px; font-weight: 800; color: #a78bfa; letter-spacing: 1px; }
        .subtitle { font-size: 14px; color: #94a3b8; margin-top: 4px; }
        .content { text-align: center; line-height: 1.6; }
        .otp-box { background: #0f172a; border: 2px dashed #a78bfa; border-radius: 8px; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #a78bfa; padding: 16px; margin: 24px 0; display: inline-block; width: 80%; }
        .notice { font-size: 13px; color: #cbd5e1; background: #334155; padding: 12px; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #64748b; border-top: 1px solid #334155; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">MatruCare AI</div>
          <div class="subtitle">Password Reset Verification Request</div>
        </div>
        <div class="content">
          <h2 style="color: #ffffff; margin-bottom: 8px;">Reset Your Account Password</h2>
          <p style="color: #94a3b8; font-size: 15px;">You requested to reset your password for the MatruCare AI Portal. Enter the 6-digit security code below to set a new password.</p>
          
          <div class="otp-box">${otp}</div>
          
          <p style="color: #f43f5e; font-weight: 600; font-size: 14px;">⏱️ This reset code is valid for 10 minutes only.</p>
          
          <div class="notice">
            If you did not request a password reset, your account is safe. Please ignore this email.
          </div>
        </div>
        <div class="footer">
          &copy; 2026 MatruCare AI Internship Programme. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};

const getRegistrationConfirmationTemplate = (registration) => {
  const teamList = registration.teamMembers && registration.teamMembers.length > 0
    ? registration.teamMembers.map((m, idx) => `<li style="margin-bottom: 4px;"><strong>Member ${idx + 2}:</strong> ${m.name} (${m.email})</li>`).join('')
    : '<li style="color: #94a3b8;">Solo Participant</li>';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 32px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .header { text-align: center; border-bottom: 2px solid #10b981; padding-bottom: 16px; margin-bottom: 24px; }
        .logo { font-size: 24px; font-weight: 800; color: #34d399; letter-spacing: 1px; }
        .badge { background: #064e3b; color: #34d399; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; display: inline-block; margin-top: 8px; text-transform: uppercase; }
        .table-info { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table-info td { padding: 10px 14px; border-bottom: 1px solid #334155; font-size: 14px; }
        .table-info td.label { color: #94a3b8; font-weight: 600; width: 35%; }
        .table-info td.value { color: #f8fafc; font-weight: 500; }
        .team-box { background: #0f172a; padding: 16px; border-radius: 8px; margin-top: 16px; border: 1px solid #334155; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #64748b; border-top: 1px solid #334155; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">MatruCare AI</div>
          <div class="badge">Registration Confirmed</div>
        </div>
        <div>
          <h2 style="color: #ffffff; margin-bottom: 8px;">Registration Successful! 🎉</h2>
          <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">
            Congratulations! Your submission for the <strong>MatruCare AI National Hackathon 2026</strong> has been received and confirmed.
          </p>

          <table class="table-info">
            <tr>
              <td class="label">Lead Participant:</td>
              <td class="value">${registration.fullName}</td>
            </tr>
            <tr>
              <td class="label">Email:</td>
              <td class="value">${registration.email}</td>
            </tr>
            <tr>
              <td class="label">Mobile Number:</td>
              <td class="value">${registration.mobile}</td>
            </tr>
            <tr>
              <td class="label">College / Institute:</td>
              <td class="value">${registration.collegeName}</td>
            </tr>
            <tr>
              <td class="label">Course & Branch:</td>
              <td class="value">${registration.course} (${registration.branch}) - ${registration.yearOfStudy} Year</td>
            </tr>
            <tr>
              <td class="label">Domain / Track:</td>
              <td class="value" style="color: #34d399; font-weight: 700;">${registration.domainTrack}</td>
            </tr>
            <tr>
              <td class="label">Project Name:</td>
              <td class="value" style="color: #38bdf8; font-weight: 700;">${registration.projectName}</td>
            </tr>
            <tr>
              <td class="label">Team Size:</td>
              <td class="value">${registration.teamSize} Member(s)</td>
            </tr>
          </table>

          <div class="team-box">
            <h4 style="margin: 0 0 10px 0; color: #38bdf8;">Team Members Breakdown:</h4>
            <ul style="margin: 0; padding-left: 20px; color: #e2e8f0; font-size: 14px;">
              <li><strong>Lead (Team Leader):</strong> ${registration.fullName} (${registration.email})</li>
              ${teamList}
            </ul>
          </div>

          <p style="margin-top: 24px; color: #94a3b8; font-size: 14px; line-height: 1.5;">
            Our evaluation panel will review your submission documents. Next round updates will be sent to this email address. Good luck!
          </p>
        </div>
        <div class="footer">
          Questions? Contact the organizing committee at <a href="mailto:matrucareai@gmail.com" style="color: #38bdf8;">matrucareai@gmail.com</a><br>
          &copy; 2026 MatruCare AI Internship Programme. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  getOtpEmailTemplate,
  getPasswordResetEmailTemplate,
  getRegistrationConfirmationTemplate,
};
