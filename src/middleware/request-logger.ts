import { NextFunction, Request, Response } from 'express';

export type LogLevel = 'info' | 'verbose';

// Logger middleware factory
export const requestLogger =
  (addHeader: boolean, level: LogLevel) =>
  (req: Request, res: Response, next: NextFunction) => {
    switch (level) {
      case 'info':
        console.info(
          `${req.method} | ${req.url} | ${new Date().toISOString()}`,
        );
        break;
      case 'verbose':
        console.info(
          `${req.method} | ${req.url} | ${req.ip} | ${
            req.headers['user-agent']
          } | ${new Date().toISOString()}`,
        );
        break;
    }

    // Add optional header to indicate request was logged
    if (addHeader) {
      res.appendHeader('X-Request-Logged', new Date().toISOString());
    }

    //Log
    next();
  };
