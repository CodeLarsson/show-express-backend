import { NextFunction, Request, Response } from 'express';
import { Cat, catSchema } from './cat.model';
import { ZodError } from 'zod';

export const validateCat = async (
  req: Request<Cat>,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(JSON.stringify(req.body));
    const parsedCat: Cat = catSchema.parse(req.body);
    req.body = parsedCat;
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.message);
    }
    next(error);
  }
};
