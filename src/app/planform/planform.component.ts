import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { Plan } from '../plan';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-planform',
  templateUrl: './planform.component.html',
  styleUrls: ['./planform.component.css']
})
export class PlanFormComponent implements OnInit {
  recipes: Recipe[];
  recipesCopy: Recipe[];
  currentRecipe: Recipe;
  plan = new Plan();

  weekdays = [
    'Su',
    'M',
    'Tu',
    'W',
    'Th',
    'F',
    'Sa'
  ];

  filters = [
    { name: 'All'},
    { name: 'Appetizers'},
    { name: 'Entrees'},
    { name: 'Sides'},
    { name: 'Raw'},
    { name: 'Slow Cooker'},
    { name: 'Desserts'}
  ];

  constructor(private recipeService: RecipeService, private router: Router, private dragulaService:DragulaService) {
    this.plan.date = "";
    this.plan.weekday = "";
    this.plan.recipes = [];

    dragulaService.setOptions('plan-bag', {
      removeOnSpill: true
    });

    dragulaService.drag.subscribe((value) => {
      console.log(value);
      this.onDrag(value.slice(1));
    });
    
    dragulaService.drop.subscribe((value) => {
      console.log(value);
      this.onDrop(value.slice(1));
    });

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

  private onDrop(args) {
    let [e, el] = args;
    console.log("recipe dropped");
    //this.addClass(e, 'ex-moved'); 
    this.plan.recipes.push(this.currentRecipe);
  }

  
  private onDrag(args) {
    let [e, el] = args;
    //this.removeClass(e, 'ex-moved');
    this.currentRecipe = new Recipe(); 
    console.log(currentRecipe);
  }

  ngOnInit() {
    this.recipesCopy = this.recipes;
  }

  onSelect(recipe: Recipe) {
    this.router.navigate(['recipe-details', recipe.id]);
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
