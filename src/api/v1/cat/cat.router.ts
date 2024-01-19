import { Router, json } from 'express';
import * as handlers from './cat.handler';
import { validateCat } from './cat.validator';

const catRouter: Router = Router();

catRouter.use(json());

catRouter.get('/', handlers.getAllHandler);
catRouter.get('/:id', handlers.getById);
catRouter.post('/', validateCat, handlers.add);
catRouter.delete('/:id', handlers.deleteById);
catRouter.put('/', validateCat, handlers.updateCat);
catRouter.patch('/', validateCat, handlers.updateCat);

export default catRouter;
