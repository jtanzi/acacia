import { Component, OnInit } from '@angular/core';
import { PlanService } from '../providers/plan.service';
import { Plan } from '../models/plan';
import { RecipeService } from '../providers/recipe.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  plans: Plan[] = [];

  constructor(private planService: PlanService, private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    const plansObservable = this.planService.getPlans();
    plansObservable.subscribe((objects) => {
      objects.forEach((value) => {
        const plan = new Plan();
        plan.id = value.key;
        plan.startDate = value.payload.val().startDate;
        plan.endDate = value.payload.val().endDate;
        plan.weekdays = value.payload.val().weekdays;
        this.plans.push(plan);
      });
      console.table(this.plans);
    })
  }

  onClickAddNew() {
    this.router.navigate(['/plan/create']);
  }

  onClickPlanRemove(planId, index) {
    this.planService.removePlan(planId);
    this.plans = this.plans.splice(index, 1);
  }

}
