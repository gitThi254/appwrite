import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongo Db connected successfully");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB connected error. Please make sure MongoDB connection error. Please make sure MongoDB is running." +
          err
      );
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
}
