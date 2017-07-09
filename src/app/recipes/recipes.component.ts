import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
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
    this.recipes = [];
    const result = recipeService.getRecipes();
    result.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        var recipe = new Recipe();
        recipe.id = snapshot.key;
        recipe.title = snapshot.val().title;
        recipe.author = snapshot.val().author;
        recipe.categories = snapshot.val().categories;
        recipe.ingredients = snapshot.val().ingredients;
        recipe.instructions = snapshot.val().instructions;
        recipe.notes = snapshot.val().notes;
        this.recipes.push(recipe);
      });
    })
  }


  ngOnInit() {
    this.recipesCopy = this.recipes;
    console.log(this.recipesCopy);
  }

  onSelect(recipe: Recipe) {
    this.router.navigate(['recipe', recipe.id]);
  }

  filterSelect(selection) {
    console.log(selection);
    if(selection != 'All') {
      this.recipes = this.recipesCopy.filter(r => { return r.categories.indexOf(selection) > -1; });
    } else {
      this.recipes = this.recipesCopy;
    }
  }


}
