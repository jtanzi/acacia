import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Router, ActivatedRoute } from "@angular/router";
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

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
  recipeObservable = new FirebaseObjectObservable();


  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    // this.recipe.title = "";
    // this.recipe.author="";
    // this.recipe.categories = [];
    // this.recipe.ingredients = [{name: "", unit: "", amount: 0}];
    // this.recipe.instructions = [{order: 1, text: ""}];
    // this.recipe.notes = "";
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.id = params['id'];
    });

    if(this.id) {
      var result = this.recipeService.getRecipe(this.id);
      this.recipeObservable = result;
      result.subscribe(snapshot => {
        this.recipe = snapshot.val();
      });
    }
  }


}
