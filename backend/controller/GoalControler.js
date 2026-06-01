import asyncHandler from "express-async-handler";

let goals=[
    {id:1,name:"laptop" , price:"100" , catogery:"corI-5"},
    {id:2,name:"close" , price:"200" , catogery:"skin"},
    {id:3,name:"shose" , price:"300" , catogery:"addidas"},
]

//@des get all goals
//route  get/api/goals
// private
//route  get/api/goals?name=shose
export const getGoals=asyncHandler(async (req, res) => {
     const searchCtogery=req.query.name

     if(searchCtogery){
         const filterSharch=goals.find(g=>g.name===searchCtogery)
        return res.json(filterSharch)
     }
    
  res.json(goals)
})

//@des get one goals
//route  get/api/goals
// private

export const getGoal = asyncHandler(async (req, res, next) => {
    const goalsID=parseInt(req.params.id)
    const specficGoal=goals.find((g)=>g.id===goalsID)

    if(!specficGoal){
        const error=new Error(`goal ${goalsID} is not occure`)
        error.status=404;
        return next(error)
       
    }
    res.json(specficGoal)
})
//@des post goals
//route  post/api/goals
// private
export const setGoals=asyncHandler(async (req,res,next)=>{
    const newGoal={
        id:goals.length + 1,
        name:req.body.name,
        price:req.body.price,
        catogery:req.body.catogery
    }
    goals.push(newGoal)
   if(!newGoal.name){
    const err=new Error(`please write the name of goal ${goals.length + 1}`)
    err.status=400;
    next(err);
   }
    res.json({massege:`goal ${goals.length + 1} is created`,newGoal})

})


//@des update products
//route  put/api/products/:id
// privete
export const updateGoals = asyncHandler(async (req, res,next) => {
    const goalsID=parseInt(req.params.id)
    const specficGoal=goals.find((g)=>g.id===goalsID)

    if(!specficGoal){
        const error=new Error(`goal ${goalsID} is not occure`)
        error.status=404;
        return next(error)
       
    }
    const updatedGoals={
        ...specficGoal,
        name:req.body.name,
        price:req.body.price,
        catogery:req.body.catogery
    }
    goals[goals.indexOf(specficGoal)]=updatedGoals
    res.json({message:`goal ${goalsID} is updated`,updatedGoals})
})

//@des delete goals
//route  delete/api/goals/:id
// private
export const deleteGoals = asyncHandler(async (req, res,next) => {
    const goalsID=parseInt(req.params.id)
    const specficGoal=goals.find((g)=>g.id===goalsID)

    if(!specficGoal){
        const error=new Error(`goal ${goalsID} is not occure`)
        error.status=404;
        return next(error)
       
    }
    goals=goals.filter((g)=>g.id!==goalsID)
    res.json({message:`goal ${goalsID} is deleted`})
})
