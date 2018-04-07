import { Component, OnInit } from '@angular/core';
import { PlanService } from '../providers/plan.service';
import { RecipeService } from '../providers/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Plan } from '../models/plan';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.scss']
})
export class PlanDetailsComponent implements OnInit {

  planId: string;
  plan: any;
  private sub: any;

  constructor(private planService: PlanService, private recipeService: RecipeService,
    private router: Router, private route: ActivatedRoute) {
      this.plan = new Plan();
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.planId = params['id'];
    });
    this.plan = this.planService.getPlan(this.planId);
    
  }

}
