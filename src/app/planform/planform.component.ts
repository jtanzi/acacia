import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../providers/recipe.service';
import { Recipe } from '../models/recipe';
import { Plan } from '../models/plan';
import { Day } from '../models/day';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { PlanService } from '../providers/plan.service';
import * as moment from 'moment';




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
  recipeObservable = new FirebaseObjectObservable();
  weekSelectOptions: any[];

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
    private router: Router, private dragulaService: DragulaService) {

    this.plan.startDate = moment().startOf('week').toDate();
    this.plan.endDate = moment().endOf('week').toDate();

    this.plan.weekdays = {
      'Su': [],
      'M': [],
      'Tu': [],
      'W': [],
      'Th': [],
      'F': [],
      'Sa': []
    };

    /* Dragula Setup */
    this.dragulaService.setOptions('recipe-bag', {
      removeOnSpill: false,
      copy: true
    });

    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });

    this.dragulaService.dropModel.subscribe((value) => {
      console.dir(value);
      this.onDropModel(value.slice(1));
    });

  }

  private onDropModel(args) {
    const [el, target, source] = args;
    console.group();
    console.dir([el, target, source]);
    console.groupEnd();
  }


  private onRemoveModel(args) {
    const [el, source] = args;
    console.dir([el, source]);
    const result = this.recipeService.getRecipe(el.getAttribute('data-recipe-id'));
    result.subscribe((next) => {
      this.currentRecipe = next;
    });

  }

  /* PrimeNg Drag & Drop Setup */

  private onDrag(event, recipe) {
    console.dir([event, recipe]);
    this.currentRecipe = recipe;
  }

  private onDrop(weekday) {
    // console.dir([weekday, recipe]);
    this.plan.weekdays[weekday].push(this.currentRecipe);
    console.dir(this.plan.weekdays[weekday]);
  }

  ngOnInit() {

    // Construct the week selector
    this.weekSelectOptions = [];
    const thisWeekStart = moment().startOf('week');
    Array.from(Array(7).keys()).forEach((i) => {
      this.weekSelectOptions.push({
        start: moment(thisWeekStart).add(7 * i, 'days').format('M/D/YYYY'),
        end: moment(thisWeekStart).add(6 + 7 * i, 'days').format('M/D/YYYY')
      });
    })
    console.dir(this.weekSelectOptions);

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
    this.dragulaService.destroy('recipe-bag');
  }

  onSelect(recipe: Recipe) {
    this.router.navigate(['recipe-details', recipe.id]);
  }

  filterSelect(selection) {
    console.log(selection);
    if (selection !== 'All') {
      this.recipes = this.recipesCopy.filter(r => r.categories.indexOf(selection) > -1);
    } else {
      this.recipes = this.recipesCopy;
    }
  }

  onSaveClick() {
    console.dir(this.plan);
    this.planService.createPlan(this.plan);
  }

  onCancelClick() {
    this.router.navigate(['']);
  }

  removeRecipeFromPlanDay(index: number, weekday: string) {
    console.log(index, weekday);
    this.plan.weekdays[weekday].splice(index, 1);
    console.dir(this.plan.weekdays[weekday]);
  }


}
