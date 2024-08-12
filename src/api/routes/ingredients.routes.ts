import express from 'express';
 const ingredientsRouter = express.Router();

import { getAllIngredients, getIngredientById, createIngredient, updateIngredient, deleteIngredient, searchIngredients } from '../controllers/ingredients.controllers';

ingredientsRouter.get('/', getAllIngredients);
ingredientsRouter.get('/:id', getIngredientById);
ingredientsRouter.post('/', createIngredient);
ingredientsRouter.patch('/:id', updateIngredient);
ingredientsRouter.delete('/:id', deleteIngredient);
ingredientsRouter.get('/search/:query', searchIngredients);

export default ingredientsRouter;

