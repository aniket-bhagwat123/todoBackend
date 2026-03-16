import mongoose from "mongoose";

const filesSchema = new mongoose.Schema(
  {
    fileKey: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    originalName: String,
    size: Number,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Files", filesSchema);