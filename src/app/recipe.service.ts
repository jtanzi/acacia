import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AF } from "./providers/af";
import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
  public recipes: FirebaseListObservable<any>;

  constructor( public db: AngularFireDatabase) {
    this.recipes = this.db.list('recipes');
  }

  createRecipe(recipe: Recipe){
    this.recipes.push(recipe);
  }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(recipeId: string) {
    return this.db.object('/recipes/recipeId');
  }

}
