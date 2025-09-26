import { configDotenv } from "dotenv";
import passport from "passport";

import { ExtractJwt, Strategy } from "passport-jwt";
import User from "../models/user.js";

configDotenv({
	quiet: true,
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
	ignoreExpiration: false,
};

passport.use(
	"jwt",
	new Strategy(jwtOptions, async (payload, done) => {
		try {
			console.log(payload.id);

			if (!payload.id) {
				return done(null, false, {
					message: "Invalid Token payload..!!",
				});
			}

			const currentTimeStamp = Math.floor(Date.now() / 1000);

			if (payload.exp && payload.exp < currentTimeStamp) {
				return done(null, false, { message: "Token Expired..!!" });
			}

			const user = await User.findById(payload.id);

			if (!user) {
				return done(null, false, {
					message: "User does not exist..!!",
				});
			}

			return done(null, user);
		} catch (error) {
			return done(null, false, { message: "Internal Server Error..!!" });
		}
	})
);

passport.serializeUser((user, done) => {
	return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		if (!user) {
			return done(null, false, { message: "User not found..!!" });
		}
		return done(null, user);
	} catch (error) {
		return done(error, false);
	}
});

export const authenticate = passport.authenticate("jwt", {
	failureRedirect: "/api/user/failedLogin",
});
