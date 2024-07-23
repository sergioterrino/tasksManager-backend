import mongoose from 'mongoose';
// import 'dotenv/config';
// import dotenv from 'dotenv';
// dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI_ATLAS)
    .then(() => console.log('tasksManagerMERNdb connected :)'))
    .catch((error) => console.log(error.message));
  } catch (error) {
    console.log(error.message);
  }
}