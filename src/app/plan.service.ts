import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AF } from './providers/af';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { Plan } from './plan';

@Injectable()
export class PlanService {
  plan: Observable<Plan>;
  plans: any;

  constructor(public db: AngularFireDatabase) { }

  createPlan(plan: Plan) {
    this.plans.push(plan);
  }

  getPlans() {
    return this.db.list('plans').snapshotChanges();
  }

  getPlan(planId: string): Observable<any> {
    const result = this.db.object(`/plans/${planId}`).snapshotChanges();
    return result;
  }

}
