import mongoose from "mongoose";

async function connectdb(uri) {
    try {
        const mongouri = uri
        if(!mongouri){throw new Error("Uri is required(connectdb/db.js)");
        await mongoose.connect(uri)
        .then((conn)=>{
            console.log("db connected");
            // console.log("db host",conn.connection.host);
            
        })
        .catch(()=>{console.log("connection failed");
        })    

        }
    } catch(error)
    {
        console.log("connection failed");
        
      console.log("mongoDb connection error",error.message);
      
      process.exit(1);
    }
    }
    
    export default connectdb
