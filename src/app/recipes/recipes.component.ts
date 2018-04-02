import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../providers/recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[];
  recipesCopy: Recipe[];

  filters = [
    { name: 'All'},
    { name: 'Appetizers'},
    { name: 'Entrees'},
    { name: 'Sides'},
    { name: 'Raw'},
    { name: 'Slow Cooker'},
    { name: 'Desserts'}
  ];

  constructor(private recipeService: RecipeService, private router: Router) {

  }


  ngOnInit() {
    this.recipes = [];
    const result = this.recipeService.getRecipes();
    result.subscribe(recipes => {
      recipes.forEach((recipe) => {
        this.recipes.push({
          id: recipe.key,
          title: recipe.payload.val().title,
          author: recipe.payload.val().author,
          ingredients: recipe.payload.val().ingredients,
          instructions: recipe.payload.val().instructions,
          notes: recipe.payload.val().notes,
          categories: recipe.payload.val().categories
        })
      })
      this.recipesCopy = this.recipes;
    });

  }

  onSelect(recipe: Recipe) {
    console.dir(recipe);
    this.router.navigate(['recipe-details', recipe.id]);
  }

  filterSelect(selection) {
    console.log(selection);
    if (selection !== 'All') {
      this.recipes = this.recipesCopy.filter(r => r.categories.indexOf(selection) > -1);
    } else {
      this.recipes = this.recipesCopy;
    }
  }


}
