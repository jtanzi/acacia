import { Component, OnInit, Input } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Router, ActivatedRoute } from "@angular/router";
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.scss']
})
export class RecipeFormComponent implements OnInit {

  units = [
    'cup(s)',
    'fl oz',
    'oz',
    'tsp',
    'tbsp',
    'liter(s)',
    'pint(s)'
  ];

  categories = [
    'Appetizers',
    'Entrees',
    'Sides',
    'Slow Cooker',
    'Raw',
    'Desserts'
  ]

  id: string;
  private sub: any;
  recipe = new Recipe();
  recipeObservable = new FirebaseObjectObservable();
  instructionIndex = 1;
  amountValid = true;
  editMode = false;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    this.recipe.title = "";
    this.recipe.author="";
    this.recipe.categories = [];
    this.recipe.ingredients = [{name: "", unit: "", amount: 0}];
    this.recipe.instructions = [{order: 1, text: ""}];
    this.recipe.notes = "";
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.id = params['id'];

    });

    if(this.id) {
      this.editMode = true;
      var result = this.recipeService.getRecipe(this.id);
      this.recipeObservable = result;
      result.subscribe(snapshot => {
        this.recipe = snapshot.val();
      });
    }
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  saveRecipe() {
    if(this.editMode) {
      this.updateRecipe();
    } else {
      this.recipeService.createRecipe(this.recipe);
    }
    this.router.navigate(['recipes']);
  }

  updateRecipe() {
    this.recipeObservable.set(this.recipe);
  }

  cancel() {
    this.router.navigate(['']);
  }

  addCategory(category) {
    // Prevent same category from being entered multiple times
    var alreadyPresent = this.recipe.categories.indexOf(category) != -1;
    console.log(alreadyPresent);
    if(!alreadyPresent) {
      this.recipe.categories.push(category);
    }
  }

  removeCategory(category) {
    var index = this.recipe.categories.indexOf(category);
    if(index != -1) {
      this.recipe.categories.splice(index, 1);
    }
  }

  addIngredient() {
    this.recipe.ingredients.push({name: "", amount: 0, unit: ""});
  }

  dropIngredient() {
    // this.recipe.ingredients.push({name: "", amount: 0, unit: ""});
  }

  addInstruction() {
    this.instructionIndex += 1;
    this.recipe.instructions.push({order: this.instructionIndex, text: ""});
  }

  amountValidator(value: string) {
    var result = /^0|[a-zA-Z]|[^\w\/]/.test(value);
    this.amountValid = !result;
  }

}
