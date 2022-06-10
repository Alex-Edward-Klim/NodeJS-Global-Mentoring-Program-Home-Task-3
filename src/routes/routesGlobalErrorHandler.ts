import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line
const routesGlobalErrorHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

export default routesGlobalErrorHandler;
