import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {

  if (isConnected) {
    console.log("Already connected to DB");
    return;
  }

  const url = process.env.MONGODB_URL;

   if (!url) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  try {
    const db = await mongoose.connect(url);

    isConnected = db.connection.readyState === 1;

    console.log("DB connected successfully");
  
  } catch (error) {
    console.log("DB connection failed", error);
    // process.exit(1);
  }

}

export default connectDB;