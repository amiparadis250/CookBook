import { z } from "zod";
import { NextFunction, Request, Response } from "express";

const ingredientSchema = z.object({
  name: z
    .string({ required_error: "The ingredient name is required" })
    .min(3, "Use at least 3 characters for the ingredient name")
    .max(50, "Don't exceed 50 characters for the ingredient name"),
  
  slug: z
    .string({ required_error: "The ingredient slug is required" }),
    
  
  description: z
    .string({ required_error: "The ingredient description is required" })
    .min(10, "The ingredient description should be at least 20 characters")
    .max(500, "The ingredient description should not exceed 500 characters"),
  
  foodGroup: z
    .string({ required_error: "The food group is required" })
    .min(3, "Food group should be at least 3 characters")
    .max(50, "Food group should not exceed 50 characters")
    .optional(),
}).strict();

const updateSchema = z.object({
  name: z
    .string({ required_error: "The ingredient name is required" })
    .min(3, "Use at least 3 characters for the ingredient name")
    .max(50, "Don't exceed 50 characters for the ingredient name")
    .regex(
      /^[A-Za-z0-9\s-]+$/,
      "Use only letters, numbers, spaces, and hyphens for the ingredient name"
    )
    .optional(),
  
  slug: z
    .string({ required_error: "The ingredient slug is required" })
    .regex(/^[a-z0-9-]+$/, "Slug should contain only lowercase letters, numbers, and hyphens")
    .optional(),
  
  description: z
    .string({ required_error: "The ingredient description is required" })
    .min(20, "The ingredient description should be at least 20 characters")
    .max(500, "The ingredient description should not exceed 500 characters")
    .optional(),
  
  foodGroup: z
    .string({ required_error: "The food group is required" })
    .min(3, "Food group should be at least 3 characters")
    .max(50, "Food group should not exceed 50 characters")
    .optional(),
});

export const isValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = ingredientSchema.parse(req.body);
    if (result) {
      next();
    }
  } catch (error: any) {
    return res.status(400).json({
      status: "fail",
      message: "Failed to create ingredient",
      error: error.errors[0].message
    });
  }
};

export const isValidUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = updateSchema.parse(req.body);
    if (result) {
      next();
    }
  } catch (error: any) {
    return res.status(400).json({
      status: "fail",
      message: "Failed to update ingredient",
      error: error.errors[0].message
    });
  }
};

