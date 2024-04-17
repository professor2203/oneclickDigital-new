import mongoose from "mongoose";
export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.log("Error connected to MongoDB:", error);
  }
};


