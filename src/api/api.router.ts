import { Router } from 'express';
import v1Router from './v1/v1.router';
import { errorHandler } from './error-handler/error-handler';

const apiRouter = Router();

apiRouter.use(errorHandler);
apiRouter.use('/v1', v1Router);

export default apiRouter;
