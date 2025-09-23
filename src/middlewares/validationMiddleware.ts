import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.flatten().fieldErrors,
            });
        }
        return next(error);
    }
};