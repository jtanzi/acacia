import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipecreate',
  templateUrl: './recipecreate.component.html',
  styleUrls: ['./recipecreate.component.css']
})
export class RecipeCreateComponent implements OnInit {

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
      var result = this.recipeService.getRecipe(this.id);
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
    this.recipeService.createRecipe(this.recipe);
    this.router.navigate(['recipes']);
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

  addInstruction() {
    this.instructionIndex += 1;
    this.recipe.instructions.push({order: this.instructionIndex, text: ""});
  }

}
