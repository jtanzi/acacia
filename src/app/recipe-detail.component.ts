import { Component } from '@angular/core';

import { Recipe } from './recipe';

@Component({
  selector: 'recipe-detail',
  template:`
    <div *ngIf="recipe">
      <h2>{{ recipe.title }} </h2>
      <h3>{{ recipe.category }}</h3>
      <ul class="ingredients">
        <li *ngFor="let ingredient of ingredients">
          <div>{{ ingredient.name }}</div>
          <div>{{ ingredient.unit }}</div>
          <div>{{ ingredient.amount }}</div>
        </li>
      </ul>
      <ol class="instructions">
        <li *ngFor="let instruction of instructions"
          <div>{{ instruction.text }}</div>
        </li>
      </ol>
    </div>
  `
})
export class RecipeDetailComponent {
  recipe: Recipe;
}
