import { registerDependency } from '../../../di-container/di-container';
import { CatDataAccessor } from './cat.data-accessor';
import { Cat } from './cat.model';
import { NextFunction, Request, Response } from 'express';

const dataAccessor = new CatDataAccessor();
registerDependency(dataAccessor.constructor.name, dataAccessor);

export const getAllHandler = async (
  req: Request,
  res: Response<Cat[] | string>,
  next: NextFunction,
) => {
  try {
    const allCats = await dataAccessor.getAllCats();
    console.log(allCats);
    if (allCats.length < 0) {
      res.status(404).send('No cats found');
    } else {
      res.status(200).json(allCats);
    }
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request<{ id: string }>,
  res: Response<Cat | string>,
  next: NextFunction,
) => {
  try {
    const catId = req.params.id;
    const cat = await dataAccessor.getCatById(catId);
    if (cat) {
      res.status(200).send(cat);
    } else {
      res.status(404).send(`No cat with ${catId} found`);
    }
  } catch (error) {
    next(error);
  }
};

export const add = async (
  req: Request<Cat>,
  res: Response<Partial<Cat>>,
  next: NextFunction,
) => {
  try {
    const createdId = await dataAccessor.addCat(req.body);
    res.status(201).json({ id: createdId });
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (
  req: Request<{ id: string }>,
  res: Response<string>,
  next: NextFunction,
) => {
  try {
    const catId = req.params.id;
    await dataAccessor.deleteCatById(catId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateCat = async (
  req: Request<Cat>,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.body);
    const updatedCat = await dataAccessor.updateCat(req.body.id, req.body);
    res.status(200).json(updatedCat);
  } catch (error) {
    next(error);
  }
};
