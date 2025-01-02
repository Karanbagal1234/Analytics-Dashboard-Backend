const body = (req,res,next)=>{
    console.log(req.body)
    next()
}

export default body