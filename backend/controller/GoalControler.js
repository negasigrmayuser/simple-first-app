import asyncHandler from "express-async-handler";
import Goal from "../modules/goalModul.js";
import User from "../modules/usermodules.js";

//@des get all goals
//route  get/api/goals
// private
//route  get/api/goals?name=shose
export const getGoals=asyncHandler(async (req, res) => {

     const goals=await Goal.find({ user: req.user.id })
    if(!goals){
        res.status(404).json({meg:"please add some goals"})
    }
    res.json(goals)
})

//@des get one goals
//route  get/api/goals
// private

export const getGoal = asyncHandler(async (req, res, next) => {
    const goal=await Goal.findById(req.params.id)
    

    if(!goal){
        throw new Error(`goal ${req.params.id} is not occure`)
    }
    res.json(goal)
})
//@des post goals
//route  post/api/goals
// private
export const setGoals=asyncHandler(async (req,res,next)=>{

    const createdGoal=await Goal.create({
        user:req.user.id,
        text:req.body.text,
        
    })
    if(!createdGoal){
        throw new Error("goal is not created,please write some text")
    }
    res.status(201).json(createdGoal)

})

//@des update products
//route  put/api/products/:id
// privete

export const updateGoals = asyncHandler(async (req, res,next) => {
    const goal=await Goal.findById(req.params.id)

    if(!goal){
        throw new Error(`goal ${req.params.id} is not occure`)
    }

    const user=await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error("user not found")
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString()!==user.id){
        res.status(401)
        throw new Error("user not authorized")
    }
    const updatedGoals=await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
     
    res.status(200).json(updatedGoals)
   
})

//@des delete goals
//route  delete/api/goals/:id
// private

export const deleteGoals = asyncHandler(async (req, res,next) => {
    const goal=await Goal.findById(req.params.id)
    if(!goal){
        throw new Error(`goal ${req.params.id} is not occure`)
    }

     const user=await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error("user not found")
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString()!==user.id){
        res.status(401)
        throw new Error("user not authorized")
    }
    const deletedGoal=await Goal.findByIdAndDelete(req.params.id)
     
    res.status(200).json({message:`goal ${req.params.id} is deleted`})

})
