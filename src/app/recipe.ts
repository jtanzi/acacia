import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

export class Recipe {
  id: string;
  title: string;
  author: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  notes: string;
}
