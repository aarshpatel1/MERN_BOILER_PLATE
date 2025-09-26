import User from "../models/user.js";
import  generateJWT  from "../utils/generateJWT.js";

export const allUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json({
			message: "All users fetched successfully..!!",
			users,
		});
	} catch (error) {
		console.log("Internal Server Error fetching all users: ", error);
		return res.status(500).json({
			message: "Internal Server Error..!!",
		});
	}
};

export const getUser = async (req, res) => {
	try {
		const userId = req.params.id;
		console.log(userId);
		const user = await User.findById(userId);
		return res.status(200).json({
			message: "User fetched successfully..!!",
			user,
		});
	} catch (error) {
		console.log("Internal Server Error fetching user: ", error);
		return res.status(500).json({
			message: "Internal Server Error..!!",
		});
	}
};

export const signup = async (req, res) => {
	try {
		console.log(req.body);

		if (!req.body.username || !req.body.password) {
			return res.status(400).json({
				message: "Please fill all the fields..!!",
			});
		}

		const checkUserExists = await User.find({
			username: req.body.username,
		});

		console.log(checkUserExists);

		if (checkUserExists.length !== 0) {
			return res.status(409).json({
				message: "User Already Exits..!!",
			});
		}

		const user = await User.create(req.body);
		return res.status(201).json({
			message: "New User added successfully..!!",
			user,
		});
	} catch (error) {
		console.log("Internal Server Error creating a user: ", error);
		return res.status(500).json({
			message: "Internal Server Error creating a user..!!",
		});
	}
};

export const updateUser = async (req, res) => {
	try {
		const userId = req.params.id;
		console.log(userId);

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({
				message: "User does not exist..!!",
			});
		}

		const updateUserData = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		return res.status(200).json({
			message: "User updated successfully..!!",
			updateUserData,
		});
	} catch (error) {
		console.log("Internal Server Error updating a user: ", error);
		return res.status(500).json({
			message: "Internal Server Error updating a user..!!",
		});
	}
};

export const deleteUser = async (req, res) => {
	try {
		const userId = req.params.id;
		console.log(userId);

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({
				message: "User does not exist..!!",
			});
		}

		const deleteUserData = await User.findByIdAndDelete(req.params.id);

		return res.status(200).json({
			message: "User deleted successfully..!!",
			deleteUserData,
		});
	} catch (error) {
		console.log("Internal Server Error deleting a user: ", error);
		return res.status(500).json({
			message: "Internal Server Error deleting a user..!!",
		});
	}
};

export const login = async (req, res) => {
	try {
		console.log(req.body);

		if (!req.body.username || !req.body.password) {
			return res.status(400).json({
				message: "Please fill all the fields..!!",
			});
		}

		const user = await User.findOne({
			username: req.body.username,
		});

		if (!user) {
			return res.status(404).json({
				message: "User does not exist..!!",
			});
		}

		if (
			user.username !== req.body.username ||
			user.password !== req.body.password
		) {
			return res.status(401).json({
				message: "You are unauthenticated..!!",
			});
		}

		const authToken = generateJWT(user._id);

		return res.status(200).json({
			message: "User Login Successfully..!!",
			userId: user._id,
			authToken,
		});
	} catch (error) {
		console.log("Internal Server Error loggin user: ", error);
		return res.status(500).json({
			message: "Internal Server Error loggin user..!!",
		});
	}
};

export const failedLogin = (req, res) => {
	return res.status(401).json({
		message: "Please login with valid credentials..!!",
	});
};
