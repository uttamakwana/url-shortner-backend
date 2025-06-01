import mongoose from "mongoose"
import { CONFIG } from "./env"

export const connectToDatabase = async () => {
    try {
        const MONGO_URI = CONFIG.MONGO_URI;
        const response = await mongoose.connect(MONGO_URI);

        console.log(`*****Database connection successfull*****`)
        console.log(`Host: ${response.connection.host}`)
        console.log(`Name: ${response.connection.name}`)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}