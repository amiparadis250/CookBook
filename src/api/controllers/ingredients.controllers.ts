import { Request, Response } from 'express';
import { IngredientsService } from '../services/ingredientServices';

export const getAllIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients: any = await IngredientsService.getAllIngredients();
    console.log("................... Trying Fetching", ingredients);
    res.json({
      message: "Ingredients fetched successfully",
      data: {
        ingredients
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve ingredients' });
    console.log(error);
  }
};

export const getIngredientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ingredient: any = await IngredientsService.getIngredientById(id);
    if (ingredient) {
      res.json({
        message: "Ingredient fetched successfully",
        data: {
          ingredient
        }
      });
    } else {
      res.status(404).json({ error: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve ingredient' });
  }
};

export const createIngredient = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, foodGroup } = req.body;
    const ingredientData = {
      name,
      slug,
      description,
      foodGroup,
    };
    const newIngredient = await IngredientsService.createIngredient(ingredientData);
    res.status(201).json({
      message: "Ingredient created successfully",
      data: {
        newIngredient
      }
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create Ingredient",
      error: error.message
    });
  }
};

export const updateIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, foodGroup } = req.body;
    const ingredientData = {
      name,
      slug,
      description,
      foodGroup,
    };
    const updatedIngredient = await IngredientsService.updateIngredient(id, ingredientData);
    res.json({
      message: "Ingredient updated successfully",
      data: {
        updatedIngredient
      }
    });
  } catch (error: any) {
    if (error.message === 'Ingredient not found') {
      res.status(404).json({ error: 'Ingredient not found' });
    } else {
      res.status(500).json({ error: 'Failed to update ingredient' });
    }
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await IngredientsService.deleteIngredient(id);
    res.status(204).send();
  } catch (error: any) {
    if (error.message === 'Ingredient not found') {
      res.status(404).json({ error: 'Ingredient not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete ingredient' });
    }
  }
};

export const searchIngredients = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (typeof query !== 'string') {
      return res.status(400).json({ error: 'Invalid search query' });
    }
    const ingredients = await IngredientsService.searchIngredients(query);
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search ingredients' });
  }
};