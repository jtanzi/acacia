import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../providers/recipe.service';

@Component({
  selector: 'app-recipeform',
  templateUrl: './recipeform.component.html',
  styleUrls: ['./recipeform.component.scss']
})
export class RecipeFormComponent implements OnInit, OnDestroy {

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
  instructionIndex = 1;
  amountValid = true;
  editMode = false;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    this.recipe.title = '';
    this.recipe.author = '';
    this.recipe.categories = [];
    this.recipe.ingredients = [{name: '', unit: '', amount: 0}];
    this.recipe.instructions = [{order: 1, text: ''}];
    this.recipe.notes = '';
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.id = params['id'];

    });

    if (this.id) {
      this.editMode = true;
      const result = this.recipeService.getRecipe(this.id);
      result.subscribe(value => {
        this.recipe = <Recipe>value;
      });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  saveRecipe() {
    if (this.editMode) {
      this.updateRecipe();
    } else {
      this.recipeService.createRecipe(this.recipe);
    }
    this.router.navigate(['recipes']);
  }

  updateRecipe() {
    // this.recipe.set(this.recipe);
  }

  cancel() {
    this.router.navigate(['']);
  }

  addCategory(category) {
    // Prevent same category from being entered multiple times
    const alreadyPresent = this.recipe.categories.indexOf(category) !== -1;
    console.log(alreadyPresent);
    if (!alreadyPresent) {
      this.recipe.categories.push(category);
    }
  }

  removeCategory(category) {
    const index = this.recipe.categories.indexOf(category);
    if (index !== -1) {
      this.recipe.categories.splice(index, 1);
    }
  }

  addIngredient() {
    this.recipe.ingredients.push({name: '', amount: 0, unit: ''});
  }

  dropIngredient() {
    // this.recipe.ingredients.push({name: "", amount: 0, unit: ""});
  }

  addInstruction() {
    this.instructionIndex += 1;
    this.recipe.instructions.push({order: this.instructionIndex, text: ''});
  }

  amountValidator(value: string) {
    const result = /^0|[a-zA-Z]|[^\w\/]/.test(value);
    this.amountValid = !result;
  }

}
