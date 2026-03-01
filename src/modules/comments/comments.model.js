import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    user_details: {
      type: Object, 
      required: true
    },
    card_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Comments", commentSchema);