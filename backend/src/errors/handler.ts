import {ErrorRequestHandler} from 'express';

interface ValidationError {
    [key:string]: string[];
}

const errorHandler:ErrorRequestHandler = (error,request,response,next) =>{
    console.error(error);
    return response.status(500).json({message:'internal server error'})
    
}

export default errorHandler;