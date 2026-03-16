import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);

    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB Disconnected");
    });

  } catch (error) {
    console.error("❌ Initial MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;