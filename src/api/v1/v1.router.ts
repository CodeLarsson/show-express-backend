import { Router } from 'express';
import catRouter from './cat/cat.router';

const v1Router = Router();

v1Router.use('/cats', catRouter);

export default v1Router;
