import mongoose  from "mongoose";
export const  connectDB = async()=>{
  try{  
   await mongoose.connect(process.env.MONGO_URI);
  console.log('databae connect successfully');
  }
  catch(error){
    console.log(`find error in database connection function & error is ${error}`)
  }
}