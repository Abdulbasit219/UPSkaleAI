import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {

  if (isConnected) {
    console.log("Already connected to DB");
    return;
  }

  const uri = process.env.MONGODB_URL;

   if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  try {
    const db = await mongoose.connect(uri);

    isConnected = db.connection.readyState === 1;

    console.log("DB connected successfully");
  
  } catch (error) {
    console.log("DB connection failed", error);
    // process.exit(1);
  }

}

export default connectDB;