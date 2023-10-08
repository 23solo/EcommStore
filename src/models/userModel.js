import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  totalNumberOfOrders: {
    type: Number,
    default: 0,
  },
  coupons: {
    type: [String],
    default: [],
  },
  totalItemsPurchased: {
    type: Number,
    default: 0,
  },
  totalAmountSpent: {
    type: Number,
    default: 0,
  },
  totalAmountSaved: {
    type: Number,
    default: 0,
  },
  isCouponValid: {
    type: Boolean,
    default: false,
  },
  cartItems: {
    type: [
      {
        key: {
          type: String,
        },
        value: {
          type: Number,
        },
      },
    ],
    default: [],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
