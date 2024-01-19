import { registerDependency } from '../../../di-container/di-container';
import { CatDataAccessor } from './cat.data-accessor';
import { Cat } from './cat.model';
import { NextFunction, Request, Response } from 'express';

const dataAccessor = new CatDataAccessor();
registerDependency(dataAccessor.constructor.name, dataAccessor);

export const getAllHandler = async (
  req: Request,
  res: Response<Cat[]>,
  next: NextFunction,
) => {
  try {
    const allCats = await dataAccessor.getAllCats();
    if (allCats.length === 0) {
      res.status(404).json([]);
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
    if (!cat) {
      res.status(404).send(`No cat with ${catId} found`);
    } else {
      res.status(200).send(cat);
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
    const wasDeleted = await dataAccessor.deleteCatById(catId);
    if (!wasDeleted) {
      res.status(404).send(`No cat with ${catId} found`);
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};

export const updateCat = async (
  req: Request<Cat | string>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedCat = await dataAccessor.updateCat(req.body.id, req.body);
    if (!updatedCat) {
      res.status(404).send(`No cat with ${req.body.id} found`);
    } else {
      res.status(200).json(updatedCat);
    }
  } catch (error) {
    next(error);
  }
};
export const adoptCat = async (
  req: Request<{ id: string }>,
  res: Response<Cat | string>,
  next: NextFunction,
) => {
  try {
    const adoptedCat = await dataAccessor.adoptCat(req.params.id);
    if (!adoptedCat) {
      res
        .status(400)
        .send(
          `Either the cat is allready adopted or no cat with ${req.params.id} found`,
        );
    } else {
      res.status(200).json(adoptedCat);
    }
  } catch (error) {
    next(error);
  }
};

export const getAdoptedCats = async (
  req: Request,
  res: Response<Cat[]>,
  next: NextFunction,
) => {
  try {
    const adoptedCats: Cat[] | undefined = await dataAccessor.getAdoptedCats();
    if (!adoptedCats || adoptedCats.length <= 0) {
      res.status(404).json([]);
    } else {
      res.status(200).json(adoptedCats);
    }
  } catch (error) {
    next(error);
  }
};

export const getNotAdoptedCats = async (
  req: Request,
  res: Response<Cat[]>,
  next: NextFunction,
) => {
  try {
    const notAdoptedCats: Cat[] | undefined =
      await dataAccessor.getNotAdoptedCats();
    if (!notAdoptedCats || notAdoptedCats.length === 0) {
      res.status(404).json([]);
    } else {
      res.status(200).json(notAdoptedCats);
    }
  } catch (error) {
    next(error);
  }
};
