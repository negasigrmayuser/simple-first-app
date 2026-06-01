import express from "express";
import { getGoals,setGoals, getGoal,updateGoals, deleteGoals } from "../controller/GoalControler.js";
const router=express.Router()

router.get("/", getGoals)
router.get("/:id", getGoal)
router.post("/", setGoals)
router.put("/:id", updateGoals)
router.delete("/:id", deleteGoals)

export default router;