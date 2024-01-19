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

catRouter.patch('/adopt/:id', handlers.adoptCat);
catRouter.get('/adopt/adopted', handlers.getAdoptedCats);
catRouter.get('/adopt/notadopted', handlers.getNotAdoptedCats);

export default catRouter;
