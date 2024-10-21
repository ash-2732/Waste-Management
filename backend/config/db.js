import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error in Mongo: ${error}`.bgRed.white);       
    }
};

export default connectDB;