import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    card_title: {
        type: String,
        required: [true, 'Card title is required'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    board_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: [true, 'Board ID is required'],
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

export default mongoose.model("Cards", cardSchema);