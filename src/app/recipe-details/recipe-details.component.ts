import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../providers/recipe.service';

import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  // Properties

  id: string;
  private sub: any;
  recipe = new Recipe();
  ingredientsArray1 = [];
  ingredientsArray2 = [];


  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.id = params['id'];
    });

    if (this.id) {
      const result = this.recipeService.getRecipe(this.id);
      result.subscribe(recipe => {
        console.dir(recipe.payload.val());
        this.recipe.id = recipe.key;
        this.recipe.author = recipe.payload.val().author;
        this.recipe.title = recipe.payload.val().title;
        this.recipe.categories = recipe.payload.val().categories;
        this.recipe.ingredients = recipe.payload.val().ingredients;
        this.recipe.instructions = recipe.payload.val().instructions;
        this.recipe.notes = recipe.payload.val().notes;

        const ingredientsArr = recipe.payload.val().ingredients;
        this.ingredientsArray1 = ingredientsArr.splice(0, ingredientsArr.length / 2);
        this.ingredientsArray2 = ingredientsArr;
      });
    }
  }

  onEditClick() {
    this.router.navigate([`recipe/${this.id}`]);
  }


}
