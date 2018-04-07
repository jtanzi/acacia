import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AF } from './af';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { Plan } from '../models/plan';

@Injectable()
export class PlanService {
  plan: Observable<Plan>;
  plans: any;

  constructor(public db: AngularFireDatabase) { }

  createPlan(plan: Plan): any {
    const planRef = this.db.list('plans');
    return planRef.push(plan);
  }

  getPlans() {
    return this.db.list('plans').snapshotChanges();
  }

  getPlan(planId: string): Observable<any> {
    const result = this.db.object(`/plans/${planId}`).valueChanges();
    return result;
  }

  updatePlan(plan: Plan): any {
    const planRef = this.db.object('plan');
    return planRef.set(plan);
  }

  removePlan(plan): any {
    const planRef = this.db.object('plan');
    return planRef.set(plan);
  }

}
