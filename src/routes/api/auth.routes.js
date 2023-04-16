import express from "express";
import passport from "passport";
import { checkUserLogged } from '../../middlewares/authMidd.js';
import { AuthController } from '../../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.get("/signup", AuthController.signup);
authRouter.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect: "api/auth/signupError",
    failureMessage: true
}), AuthController.signup);
authRouter.get("/signupError", AuthController.signupError);
authRouter.get("/signin", AuthController.signin);
authRouter.post("/signin", passport.authenticate("signinStrategy", {
    successRedirect: "/api/auth/profile",
    failureRedirect: "/api/auth/signin"
}));
authRouter.get('/logout', AuthController.logout);
authRouter.get("/test", AuthController.test);
authRouter.get("/profile", checkUserLogged, AuthController.profile);

export { authRouter };