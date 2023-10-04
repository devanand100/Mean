export function errorHandler(err, req, res, next){
    
    const errStatus =  res.statusCode || 500;
    const errmsg = err.message || "somthing went wrong" ;

    res.status(errStatus).json({
        message:errmsg,
        statusCode:errStatus,
        stack: err.stack
    })
}