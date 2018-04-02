import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { AF } from './af';
import { Recipe } from '../models/recipe';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';

@Injectable()
export class RecipeService {
  public recipes: any;
  public recipe: Observable<Recipe>;

  constructor( public db: AngularFireDatabase) {
  }

  createRecipe(recipe: Recipe) {
    const recipeRef = this.db.list('recipes');
    return recipeRef.push(recipe);
  }

  getRecipes() {
    return this.db.list('recipes').snapshotChanges();
  }

  getRecipe(recipeId: string): Observable<any> {
    const result = this.db.object(`/recipes/${recipeId}`).snapshotChanges();
    return result;
  }

  updateRecipe(recipe: Recipe) {
    const recipeRef = this.db.object('recipe');
    return recipeRef.set(recipe);
  }

  removeRecipe() {
    const recipeRef = this.db.object('recipe');
    return recipeRef.remove();
  }

}
