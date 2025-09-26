import express from "express";
import {
	signup,
	login,
	allUsers,
	deleteUser,
	getUser,
	updateUser,
	failedLogin,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/allUsers", authenticate, allUsers);
router.get("/getUser/:id", authenticate, getUser);
router.put("/updateUser/:id", authenticate, updateUser);
router.patch("/updateUser/:id", authenticate, updateUser);
router.delete("/deleteUser/:id", authenticate, deleteUser);
router.get("/failedLogin", failedLogin);

export default router;
