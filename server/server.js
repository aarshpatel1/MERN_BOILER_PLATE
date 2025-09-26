import express from "express";
import { configDotenv } from "dotenv";

import db from "./config/db.js";
import router from "./routes/index.js";

configDotenv({
	quiet: true,
});

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router)

app.listen(port, (err) => {
	err
		? console.log("Error starting the server: ", err)
		: console.log("Server is running on http://127.0.0.1:" + port);
});
