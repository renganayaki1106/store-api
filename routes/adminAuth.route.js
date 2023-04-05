import express from "express"
import {adminSignup, adminLogin} from "../controllers/adminAuth.controller.js"

const router = express.Router();

router.post("/signup",adminSignup)
router.post("/login",adminLogin)

export default router;

