import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanService } from '../providers/plan.service';
import { RecipeService } from '../providers/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Plan } from '../models/plan';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.scss']
})
export class PlanDetailsComponent implements OnInit {

  planId: string;
  planRef: any;
  plan = new Plan();
  ingredientList = [];

  days = [];
  private sub: any;

  constructor(private planService: PlanService, private recipeService: RecipeService,
    private router: Router, private route: ActivatedRoute) {

    }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.planId = params['id'];

      this.planService.getPlan(this.planId)
      .subscribe( snapshot => {
        const value = snapshot.payload.val();
        this.plan.startDate = value.startDate;
        this.plan.endDate = value.endDate;
        this.plan.weekdays = value.weekdays;
        this.days = Object.keys(value.weekdays);
        console.table(value.ingredientList);
        this.plan.ingredientList = value.ingredientList;

        this.plan.ingredientList.forEach((item) => {
          this.ingredientList.push(item);
        });
      });

    });

  }

  onRecipeListItemClick(recipeId: string) {
    this.router.navigate([`recipe-details/${recipeId}`]);
  }

}

interface IngredientListItem {
  item: string;
  amount: number;
  gotIt: boolean;
}
