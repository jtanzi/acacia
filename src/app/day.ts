import { Recipe } from './recipe';

export class Day {

  day: string;
  recipes: Recipe[];

  constructor(d) {
    this.day = d;
    this.recipes = [];
  }
  
}
