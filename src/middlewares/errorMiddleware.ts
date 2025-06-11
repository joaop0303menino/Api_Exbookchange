import { NextFunction, Request, Response } from "express";
import APIErrorsHandler from "../helpers/APIErrors";

export const errorMiddlewares = (error: Error & Partial<APIErrorsHandler>, req: Request, res: Response, next: NextFunction): void  => {
    const statusCode = error.statusCode? error.statusCode : 500;
    const mensage = error.statusCode? error.message : "Internal Server Error";
    console.log({status: "error", mensage, details: error});

    res.status(statusCode).json({status: "error", mensage, details: error});
    return;
};