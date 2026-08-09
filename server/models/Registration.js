const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Member email is required'],
    trim: true,
    lowercase: true,
  },
});

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile Number is required'],
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'],
    },
    collegeName: {
      type: String,
      required: [true, 'College Name is required'],
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
    },
    branch: {
      type: String,
      required: [true, 'Branch is required'],
    },
    yearOfStudy: {
      type: String,
      required: [true, 'Year of Study is required'],
    },
    domainTrack: {
      type: String,
      required: [true, 'Domain/Track is required'],
    },
    projectName: {
      type: String,
      required: [true, 'Project Name is required'],
      minlength: [5, 'Project name must be at least 5 characters'],
    },
    pptLink: {
      type: String,
      required: [true, 'PPT Link is required'],
    },
    prototypeLink: {
      type: String,
      required: [true, 'Prototype Link is required'],
    },
    demoVideoLink: {
      type: String,
      default: '',
    },
    teamSize: {
      type: Number,
      required: [true, 'Team Size is required'],
      min: 1,
      max: 5,
    },
    teamMembers: [teamMemberSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Registration', registrationSchema);
