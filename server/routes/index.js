import express from "express";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
	return res.status(200).json({
		message: "API is running successfully..!",
		routes: {
			"/user": "User auth and CRUD routes",
		},
	});
});

router.use("/user", userRoutes);

export default router;
