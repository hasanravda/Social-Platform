import express from "express";
import { login, logout, signup, onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/onboarding",protectRoute,onboard);
router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({success: true, user: req.user});
});

export default router              
// Exporting the router allows it to be imported in other files, such as server.js, where it can be used to handle requests to the /api/auth endpoint.