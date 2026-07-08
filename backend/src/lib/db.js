import mongoose from "mongoose";

async function connectdb(uri) {
  try {
    const mongouri = uri;
    console.log(typeof mongouri);
    
    if (!mongouri) {
      throw new Error("Uri is required(connectdb/db.js)");
    }
      await mongoose
        .connect(mongouri)
        .then(() => {
          console.log("db connected");
          // console.log("db host",conn.connection.host);
        })
        .catch((err) => {
          console.log("connection failed",err);
        });
    
  } catch (error) {
    console.log("connection failed");

    console.log("mongoDb connection error", error.message);

    process.exit(1);
  }
}

export default connectdb;
