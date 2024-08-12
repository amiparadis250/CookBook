import { Op } from 'sequelize';
import Ingredient from "../../models/ingredients";

interface IngredientAttributes {
  id: string;
  name: string;
  slug: string;
  description?: string;
  foodGroup?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CreateIngredientDTO {
  name: string;
  slug: string;
  description?: string;
  foodGroup?: string;
}

export class IngredientsService {
  static async getAllIngredients() {
    try {
      const ingredients = await Ingredient.findAll();
      console.log("Fetched Ingredients:", ingredients); // Debugging line
      if (!ingredients) {
        throw new Error("No ingredients found");
      }
      return ingredients;
    } catch (error:any) {
      console.error("Error in getAllIngredients:", error); // Debugging line
      throw new Error(`Failed to fetch ingredients: ${error.message}`);
    }
  }
  

  static async getIngredientById(id: string) {
    return await Ingredient.findOne({
      where: { id }
    });
  }

  static async createIngredient(ingredientData: CreateIngredientDTO) {
    return await Ingredient.create(ingredientData as any);
  }

  static async updateIngredient(id: string, ingredientData: Partial<CreateIngredientDTO>) {
    const ingredient = await Ingredient.findOne({
      where: { id }
    });
    if (!ingredient) throw new Error("Ingredient not found");
    return await ingredient.update(ingredientData);
  }

  static async deleteIngredient(id: string) {
    const ingredient = await Ingredient.findOne({
      where: { id }
    });
    if (!ingredient) throw new Error("Ingredient not found");
    return await ingredient.destroy();
  }

  static async searchIngredients(query: string) {
    return await Ingredient.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } }
        ]
      }
    });
  }
}
