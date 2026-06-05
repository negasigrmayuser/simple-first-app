import express from "express";
import { getGoals,setGoals, getGoal,updateGoals, deleteGoals } from "../controller/GoalControler.js";
import { protect } from "../middelware/authMiddleware.js";
const router=express.Router()

router.route("/").get(protect, getGoals).post(protect, setGoals)
router.route("/:id").get(protect, getGoal).put(protect, updateGoals).delete(protect, deleteGoals)

export default router;