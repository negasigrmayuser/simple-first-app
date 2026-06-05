import express from "express";
import { registerUser,loginUser,getme } from "../controller/userController.js";
import { protect } from "../middelware/authMiddleware.js";
const router=express.Router()
router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/me", protect, getme)

export default router;