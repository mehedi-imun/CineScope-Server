/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //       await fn(req, res, next);
    //     } catch (error) {
    //       console.log(error);
    //       res.status(500).json({
    //         success: false,
    //         message: "Something went wrong!",
    //         error: error,
    //       });
    //     }

    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Could not fetch random movie!",
        error: error,
      });
    });
  };
};
