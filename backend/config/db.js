import mongoose from "mongoose";

const connectDB = async () => {
  let mongodbURI = process.env.MONGODB_URI;
  const projectName = "gpc-ResumeBuilder";

  if (!mongodbURI) {
    throw new Error("MONGODB_URI environment variable not set");
  }

  if (mongodbURI.endsWith("/")) {
    mongodbURI = mongodbURI.slice(0, -1);
  }

  await mongoose.connect(`${mongodbURI}/${projectName}`);
  console.log("Database connected successfully");
};

export default connectDB;
