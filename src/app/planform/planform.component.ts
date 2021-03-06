import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../providers/recipe.service';
import { Recipe } from '../models/recipe';
import { Plan } from '../models/plan';
import { Day } from '../models/day';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { PlanService } from '../providers/plan.service';
import { Parser } from '../parser';
import * as moment from 'moment';

interface Weekday {
  recipeId: string;
  recipeTitle: string;
}


@Component({
  selector: 'app-planform',
  templateUrl: './planform.component.html',
  styleUrls: ['./planform.component.scss']
})
export class PlanFormComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  recipesCopy: Recipe[];
  public currentRecipe: Recipe;
  plan = new Plan();
  ingredientList = [];
  parser = new Parser();
  recipeObservable = new FirebaseObjectObservable();
  weekSelectOptions: any[];
  selectedWeek: any = {};

  weekdays = [
    'Su',
    'M',
    'Tu',
    'W',
    'Th',
    'F',
    'Sa'
  ];

  filters = [
    { label: 'All', value: 'All'},
    { label: 'Appetizers', value: 'Appetizers'},
    { label: 'Entrees', value: 'Entrees'},
    { label: 'Sides', value: 'Sides'},
    { label: 'Raw', value: 'Raw'},
    { label: 'Slow Cooker', value: 'Slow Cooker'},
    { label: 'Desserts', value: 'Desserts'}
  ];

  selectedFilter = 'All';

  constructor(private planService: PlanService, private recipeService: RecipeService,
    private router: Router) {

    
    this.plan.startDate = moment().startOf('week').toString();
    this.plan.endDate = moment().endOf('week').toString();

    this.plan.weekdays = {
      'Su': [],
      'M': [],
      'Tu': [],
      'W': [],
      'Th': [],
      'F': [],
      'Sa': []
    };

  }

  /* PrimeNg Drag & Drop Setup */

  private onDrag(event, recipe) {
    console.dir([event, recipe]);
    this.currentRecipe = recipe;
  }

  private onDrop(weekday) {
    const ingredientsList = this.currentRecipe.ingredients.map( x => x.name );
    const wd = <Weekday>{
      recipeId: this.currentRecipe.id,
      recipeTitle: this.currentRecipe.title
    };
    this.ingredientList = this.ingredientList.concat(this.currentRecipe.ingredients);
    console.dir(this.ingredientList);
    this.plan.weekdays[weekday].push(wd);
  }

  ngOnInit() {

    // Construct the week selector
    this.weekSelectOptions = [];
    const thisWeekStart = moment().startOf('week');
    Array.from(Array(7).keys()).forEach((i) => {
      const start = moment(thisWeekStart).add(7 * i, 'days').format('M/D');
      const end = moment(thisWeekStart).add(6 + 7 * i, 'days').format('M/D/YYYY')
      this.weekSelectOptions.push({
        label: `${start} - ${end}`,
        value: { start: start, end: end }
      });
    })
    this.selectedWeek = this.weekSelectOptions[0];
    this.plan.startDate = this.selectedWeek.start;
    this.plan.endDate = this.selectedWeek.end;

    this.recipes = [];
    const result = this.recipeService.getRecipes();
    result.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        const recipe = new Recipe();
        recipe.id = snapshot.key;
        recipe.title = snapshot.payload.val().title;
        recipe.author = snapshot.payload.val().author;
        recipe.categories = snapshot.payload.val().categories;
        recipe.ingredients = snapshot.payload.val().ingredients;
        recipe.instructions = snapshot.payload.val().instructions;
        recipe.notes = snapshot.payload.val().notes;
        this.recipes.push(recipe);
      });
      this.recipesCopy = this.recipes;
    })

  }

  ngOnDestroy() {
  }

  onSelect(recipe: Recipe) {
    this.router.navigate(['recipe-details', recipe.id]);
  }

  filterSelect(selection) {
    if (selection !== 'All') {
      this.recipes = this.recipesCopy.filter(r => r.categories.indexOf(selection) > -1);
    } else {
      this.recipes = this.recipesCopy;
    }
  }

  onSaveClick() {
    this.plan.startDate = this.selectedWeek.start;
    this.plan.endDate = this.selectedWeek.end;
    
    // Parse ingredient terms
    const parserTerms = this.ingredientList.map(elem => elem.name);
    const parsedTerms = this.parser.getWords(parserTerms);

    this.plan.ingredientList = this.ingredientList.map((elem, i) => {
      const ingredientListItem = { name: null, amount: 0, gotIt: false};
      if (parsedTerms[i]) {
        ingredientListItem.name = parsedTerms[i];
        ingredientListItem.amount = elem.amount;
      } else {
        elem = null;
      }
      return ingredientListItem;
    });
    this.plan.ingredientList = this.plan.ingredientList.filter( elem => elem.name !== null);
    this.planService.createPlan(this.plan);
    this.router.navigate(['/plans']);
  }

  onCancelClick() {
    this.router.navigate(['/plans']);
  }

  removeRecipeFromPlanDay(index: number, weekday: string) {
    this.plan.weekdays[weekday].splice(index, 1);
  }

  dateSelectorChanged(value: any) {
    console.dir(this.selectedWeek)
  }

}
