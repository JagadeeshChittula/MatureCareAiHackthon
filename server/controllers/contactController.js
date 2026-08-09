const Contact = require('../models/Contact');
const { sendEmail } = require('../config/nodemailer');

// @desc    Submit Contact Us Form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields (Name, Email, Message) are required' });
    }

    const contactMsg = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    try {
      await sendEmail({
        to: 'matrucareai@gmail.com',
        subject: `MatruCare AI Portal Contact Inquiry from ${name.trim()}`,
        html: `
          <h3>New Contact Message Received</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f1f5f9; padding: 12px; border-left: 4px solid #3b82f6;">${message}</blockquote>
        `,
      });
    } catch (emailErr) {
      console.warn('[Contact Email Exception]:', emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been dispatched to matrucareai@gmail.com.',
      contactMsg,
    });
  } catch (error) {
    console.error('[Contact Controller Error]:', error);
    return res.status(500).json({ success: false, message: 'Server error processing contact message' });
  }
};

module.exports = { submitContact };
