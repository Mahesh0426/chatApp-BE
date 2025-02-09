import mongoose from "mongoose";

export const connectToMongoDB = () => {
  try {
    const connect = mongoose.connect(
      process.env.DB_CONNECT_URL + "chatApp-database"
    );
    if (connect) {
      console.log(`Database connected at  chattApp-database successully!!!`);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
