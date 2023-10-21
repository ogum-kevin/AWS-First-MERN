const notFound = (req, res, next) => {
    const error = new Error(`URL Not Found-${req.originalUrl}`);
    res.status(404);
    next(error)
}

const errorHandling = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }
    console.log(message)
    res.status(statusCode).render('error',{errorCode:statusCode,errorMessage:message})
    
    /*json({
        message,
        stack: process.env.NODE_ENV === 'PRODUCTION' ? null : err.stack,
    })*/

}

module.exports = {
    notFound,
    errorHandling
}