// import express, { NextFunction, Response, Request } from "express";
// import logger from "../common/logger/logger";
// import { AppError } from "../common/utils/error";

//   // Error handling Middleware functions

//   // Error handling Middleware function for logging the error message
//   const errorLogger = (
//     err: Error,
//     req: Request,
//     res: Response,
//     next: NextFunction) => {
//       console.log( `error ${err.message}`)
//       next(err) // calling next middleware
// }

// // Error handling Middleware function reads the error message
// // and sends back a response in JSON format
// const errorResponder = (
//   err: AppError,
//   req: Request,
//   res: Response,
//   next: NextFunction) => {
//       res.header("Content-Type", 'application/json')

//       const status = err.statusCode || 400
//       res.status(status).send(err.message)
// }

// // Fallback Middleware function for returning
// // 404 error for undefined paths
// const invalidPathHandler = (
// req: Request,
// res: Response,
// next: NextFunction) => {
//   res.status(404)
//   res.send('invalid path')
// }
