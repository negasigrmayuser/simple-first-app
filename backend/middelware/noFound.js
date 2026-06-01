 const noFound=(req,res,next)=>{
    const error=new Error(`this is 404 not found`)
    error.status=404;
    next(error)
}
export default noFound;