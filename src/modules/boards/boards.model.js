import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    board_title: {
        type: String,
        required: [true, 'Board title is required'],
        trim: true,
    },
    description: {
        type: String,
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

export default mongoose.model("Board", boardSchema);