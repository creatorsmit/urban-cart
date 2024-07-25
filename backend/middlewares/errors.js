
import ErrorHandler from '../utils/errorHandler.js';

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || 'Internal Server Error',
    };

    //Handle invalid mongoose id error
    if (err?.name === 'CastError') {
        const message = `Resource not found, Invalid : ${err?.path}`;
        error = new ErrorHandler(message, 404);
    }

    if (err?.name === 'RangeError') {
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message, 400);
    }

    //Validation Error
    if (err?.name === 'ValidationError') {
        const message = `short or long id found, Invalid : ${err?.path}`;
        error = new ErrorHandler(message, 404);
    }

    if (process.env.Node_env === 'DEVELOPMENT'){

        res.status(err.statusCode).json(
            {
                message: error.message,
                error:err,
                stack:err?.stack,
            }
        );
    }

    if (process.env.Node_env === 'PRODUCTION'){
        
        res.status(err.statusCode).json(
            {
                message: error.message,
            }
        );
    }

    
};

