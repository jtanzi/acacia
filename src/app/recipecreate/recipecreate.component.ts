import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipecreate',
  templateUrl: './recipecreate.component.html',
  styleUrls: ['./recipecreate.component.css']
})
export class RecipeCreateComponent implements OnInit {
  // @Input() recipe: Recipe;
  units = [
    'cup(s)',
    'fl oz',
    'oz',
    'tsp',
    'tbsp',
    'liter(s)',
    'pint(s)'
  ];

  recipe = new Recipe();
  instructionIndex = 1;


  constructor(
  ) {
      this.recipe.title = "";
      this.recipe.author="";
      this.recipe.ingredients = [{name: "", unit: "", amount: 0}];
      this.recipe.instructions = [{order: 1, text: ""}];
      this.recipe.notes = "";
    }

  ngOnInit() {

  }

  saveRecipe() {
    console.log(this.recipe);
  }

  cancel() {
    console.log(this.recipe);
  }

  addIngredient() {
    this.recipe.ingredients.push({name: "", amount: 0, unit: ""});
  }

  addInstruction() {
    this.instructionIndex += 1;
    this.recipe.instructions.push({order: this.instructionIndex, text: ""});
  }

}
