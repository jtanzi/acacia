import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Recipe } from './recipe';

@Injectable()
export class RecipeService {
  public database: AngularFireDatabase;

  constructor() {

  }

  createRecipe( recipe: Recipe, db: AngularFireDatabase ){
      const recipes = db.list('/recipes');
      recipes.push(recipe);
  }

  getRecipes( db: AngularFireDatabase ) {
    return db.list('/recipes');
  }



}
