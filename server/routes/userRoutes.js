import express from "express";
import {
	addUser,
	allUsers,
	deleteUser,
	getUser,
	updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/allUsers", allUsers);
router.get("/getUser/:id", getUser);
router.post("/addUser", addUser);
router.put("/updateUser/:id", updateUser);
router.patch("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
