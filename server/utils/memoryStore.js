/**
 * In-Memory Data Store Fallback for zero-config offline execution
 */

const users = [];
const registrations = [];
const contacts = [];

const memoryStore = {
  // USER OPERATIONS
  findUserByEmail: async (email) => {
    return users.find((u) => u.email === email.toLowerCase().trim()) || null;
  },

  findUserById: async (id) => {
    return users.find((u) => u._id === id.toString()) || null;
  },

  createUser: async (userData) => {
    const newUser = {
      _id: 'user_' + Math.random().toString(36).substr(2, 9),
      isVerified: false,
      otp: null,
      otpExpiresAt: null,
      createdAt: new Date(),
      ...userData,
      save: async function () {
        const idx = users.findIndex((u) => u._id === this._id);
        if (idx !== -1) users[idx] = this;
        return this;
      },
    };
    users.push(newUser);
    return newUser;
  },

  // REGISTRATION OPERATIONS
  findRegistrationByUser: async (userId) => {
    return registrations.find((r) => r.user.toString() === userId.toString()) || null;
  },

  findRegistrationById: async (id) => {
    return registrations.find((r) => r._id === id.toString()) || null;
  },

  createRegistration: async (regData) => {
    const newReg = {
      _id: 'reg_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      ...regData,
      deleteOne: async function () {
        const idx = registrations.findIndex((r) => r._id === this._id);
        if (idx !== -1) registrations.splice(idx, 1);
        return true;
      },
    };
    registrations.push(newReg);
    return newReg;
  },

  // CONTACT OPERATIONS
  createContact: async (contactData) => {
    const newContact = {
      _id: 'contact_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      ...contactData,
    };
    contacts.push(newContact);
    return newContact;
  },
};

module.exports = memoryStore;
