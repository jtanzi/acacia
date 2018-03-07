import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { Plan } from '../plan';
import { Day } from '../day';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-planform',
  templateUrl: './planform.component.html',
  styleUrls: ['./planform.component.css']
})
export class PlanFormComponent implements OnInit {
  public recipes: Recipe[];
  recipesCopy: Recipe[];
  public currentRecipe: Recipe;
  plan = new Plan();
  recipeObservable = new FirebaseObjectObservable();

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
    this.plan.weekdays = {
      'Su': [],
      'M': [],
      'Tu': [],
      'W': [],
      'Th': [],
      'F': [],
      'Sa': []
    };

    this.dragulaService.setOptions('plan-bag', {
      removeOnSpill: false
    });

    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });

    this.dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });

  }

  private onDropModel(args) {
    let [el, target, source] = args;
    console.group();
    console.log(this.plan.weekdays[target.id]);
    console.groupEnd();
  }


  private onRemoveModel(args) {
    let [el, source] = args;
    console.log(el.getAttribute('data-recipe-id'));
    var result = this.recipeService.getRecipe(el.getAttribute('data-recipe-id'));
    this.recipeObservable = result;
    result.subscribe(snapshot => {
      this.currentRecipe = snapshot.val();
    });
  }

  ngOnInit() {
    

    this.recipes = [];
    const result = this.recipeService.getRecipes();
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
      this.recipesCopy = this.recipes;
    })

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
