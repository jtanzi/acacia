import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

export class Recipe {
  title: string;
  author: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  notes: string;
}
