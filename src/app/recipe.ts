import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

export class Recipe {

  constructor(
    title: string,
    author: string,
    prepTime: string,
    ingredients: Ingredient[],
    instructions: Instruction[],
    notes: string
  ) { }

}
