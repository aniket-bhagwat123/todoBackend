import mongoose from 'mongoose';

const springsSchema = new mongoose.Schema(
  {
    spring_name: {
      type: String,
      required: [true, 'Spring name is required'],
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Spring', springsSchema);
