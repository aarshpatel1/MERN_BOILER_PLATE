import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv({
	quiet: true,
});

mongoose.connect(process.env.MONGO_URI + "MERN_BOLIER_PLATE");

const db = mongoose.connection;

db.once("open", (err) => {
	if (err) {
		console.log("Error connecting to MongoDB..!!", err);
		return false;
	}
	console.log("MongoDB successfully connected..!!");
});

export default db;
