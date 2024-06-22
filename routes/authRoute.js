import express from "express";

import { GetAllProfile, logoutIsAuth, registerController, updatePasswordController, updateProfileController, userLogin } from "../controllers/authController.js";
import { isAuth } from "../middlewares/authmiddleware.js";

const router = express.Router()

router.post("/register", registerController);
router.post("/login", userLogin);
router.get("/profile", isAuth, GetAllProfile);
router.get("/logout", isAuth, logoutIsAuth);
router.put("/update", isAuth, updateProfileController)
router.put("/update-password", isAuth, updatePasswordController)

export default router