import express from "express";
import { configDotenv } from "dotenv";

import db from "./config/db.js";
import router from "./routes/index.js";

import session from "express-session";
import passport from "passport";

configDotenv({
	quiet: true,
});

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		name: "passportJWT",
		secret: process.env.JWT_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60,
			httpOnly: true,
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.listen(port, (err) => {
	err
		? console.log("Error starting the server: ", err)
		: console.log("Server is running on http://127.0.0.1:" + port);
});
