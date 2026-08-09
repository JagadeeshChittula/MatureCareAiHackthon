const Registration = require('../models/Registration');
const { sendEmail } = require('../config/nodemailer');
const { getRegistrationConfirmationTemplate } = require('../utils/emailTemplates');

// @desc    Submit Hackathon Registration Form
// @route   POST /api/hackathon/register
// @access  Private
const registerHackathon = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      collegeName,
      course,
      branch,
      yearOfStudy,
      domainTrack,
      projectName,
      pptLink,
      prototypeLink,
      demoVideoLink,
      teamSize,
      teamMembers,
    } = req.body;

    const existingRegistration = await Registration.findOne({ user: req.user._id });
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You have already registered for the hackathon event.',
      });
    }

    // Input Validation
    if (!fullName || fullName.trim().length < 3) {
      return res.status(400).json({ success: false, message: 'Full name must be at least 3 characters' });
    }

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile.trim())) {
      return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit Indian mobile number' });
    }

    if (!collegeName || !course || !branch || !yearOfStudy || !domainTrack) {
      return res.status(400).json({ success: false, message: 'Academic and track details are required' });
    }

    if (!projectName || projectName.trim().length < 5) {
      return res.status(400).json({ success: false, message: 'Project name must be at least 5 characters' });
    }

    if (!pptLink || !prototypeLink) {
      return res.status(400).json({ success: false, message: 'PPT Link and Prototype Link are mandatory' });
    }

    const numTeamSize = Number(teamSize);
    if (!numTeamSize || numTeamSize < 1 || numTeamSize > 5) {
      return res.status(400).json({ success: false, message: 'Team size must be between 1 and 5' });
    }

    let parsedMembers = [];
    if (numTeamSize > 1) {
      if (!Array.isArray(teamMembers) || teamMembers.length !== numTeamSize - 1) {
        return res.status(400).json({
          success: false,
          message: `Please provide details for all ${numTeamSize - 1} additional team members.`,
        });
      }

      for (let i = 0; i < teamMembers.length; i++) {
        const m = teamMembers[i];
        if (!m.name || !m.name.trim() || !m.email || !m.email.trim()) {
          return res.status(400).json({
            success: false,
            message: `Member #${i + 2} name and email are mandatory.`,
          });
        }
        parsedMembers.push({
          name: m.name.trim(),
          email: m.email.trim().toLowerCase(),
        });
      }
    }

    const registration = await Registration.create({
      user: req.user._id,
      fullName: fullName.trim(),
      email: req.user.email,
      mobile: mobile.trim(),
      collegeName: collegeName.trim(),
      course,
      branch,
      yearOfStudy,
      domainTrack,
      projectName: projectName.trim(),
      pptLink: pptLink.trim(),
      prototypeLink: prototypeLink.trim(),
      demoVideoLink: demoVideoLink ? demoVideoLink.trim() : '',
      teamSize: numTeamSize,
      teamMembers: parsedMembers,
    });

    // Confirmation email
    try {
      await sendEmail({
        to: req.user.email,
        subject: `MatruCare AI — Hackathon Registration Confirmation (${registration.projectName})`,
        html: getRegistrationConfirmationTemplate(registration),
      });
    } catch (emailErr) {
      console.warn('[Hackathon Email Exception]:', emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Hackathon Registration submitted successfully!',
      registration,
    });
  } catch (error) {
    console.error('[Hackathon Registration Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error submitting registration',
    });
  }
};

// @desc    Get User's Hackathon Entry
// @route   GET /api/hackathon/my-entry
// @access  Private
const getMyEntry = async (req, res) => {
  try {
    const registration = await Registration.findOne({ user: req.user._id });
    return res.status(200).json({
      success: true,
      registered: !!registration,
      registration: registration || null,
    });
  } catch (error) {
    console.error('[Get My Entry Error]:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching registration details' });
  }
};

// @desc    Delete Hackathon Registration Entry
// @route   DELETE /api/hackathon/:id
// @access  Private
const deleteEntry = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration entry not found' });
    }

    if (registration.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this registration' });
    }

    await registration.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Hackathon registration entry deleted successfully.',
    });
  } catch (error) {
    console.error('[Delete Entry Error]:', error);
    return res.status(500).json({ success: false, message: 'Server error deleting registration' });
  }
};

module.exports = {
  registerHackathon,
  getMyEntry,
  deleteEntry,
};
