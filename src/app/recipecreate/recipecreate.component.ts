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

  id: string;
  private sub: any;
  recipe = new Recipe();
  instructionIndex = 1;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe( params => {
      this.id = params['id'];
      console.log(this.id);

      if(this.id) {
        this.recipeService.getRecipe(this.id);
        const result = this.recipeService.recipe;
        result.subscribe(r => {
          this.recipe.title = r.title;
          this.recipe.author = r.author;
          this.recipe.ingredients = r.ingredients;
          this.recipe.instructions = r.instructions;
          this.recipe.notes = r.notes;
        });
      }
      else {
        this.recipe.title = "";
        this.recipe.author="";
        this.recipe.ingredients = [{name: "", unit: "", amount: 0}];
        this.recipe.instructions = [{order: 1, text: ""}];
        this.recipe.notes = "";
      }
    })
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  saveRecipe() {
    console.log(this.recipe);
    this.recipeService.createRecipe(this.recipe);
  }

  cancel() {
    this.router.navigate(['']);

  }

  addIngredient() {
    this.recipe.ingredients.push({name: "", amount: 0, unit: ""});
  }

  addInstruction() {
    this.instructionIndex += 1;
    this.recipe.instructions.push({order: this.instructionIndex, text: ""});
  }

}
