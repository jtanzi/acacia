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
  plan: Plan;
  ingredientList = [];
  // weekdays = [
  //   'Su',
  //   'M',
  //   'Tu',
  //   'W',
  //   'Th',
  //   'F',
  //   'Sa'
  // ];

  days: any[];
  private sub: any;

  constructor(private planService: PlanService, private recipeService: RecipeService,
    private router: Router, private route: ActivatedRoute) {
      // this.plan = new Plan();
      this.days = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
    }

  ngOnInit() {
    this.sub = this.route.params;
    this.planRef = this.sub.pipe(mergeMap(val => this.planService.getPlan(val['id'])))
      .subscribe( result => {
        this.plan = result;
        console.dir(this.plan);
        this.plan.ingredientList.forEach((item) => {
          console.dir(item);
          this.ingredientList.push(item);
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
