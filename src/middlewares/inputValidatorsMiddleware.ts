import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const inputValidatorsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      resultCode: 1,
      errors: errors.array(),
    });
  } else {
    next();
  }
};
