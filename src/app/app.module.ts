import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';

import { MaterialModule } from '@angular/material';

import { RecipeService } from './recipe.service';
import { PlanService } from './plan.service';
import { AF } from './providers/af';

import { AppComponent } from './app.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';

import { RouterModule, Routes} from "@angular/router";
import { FormsModule } from "@angular/forms";
import { RecipesComponent } from './recipes/recipes.component';
import { PlansComponent } from './plans/plans.component';
import { PlanCreateComponent } from './plancreate/plancreate.component';
import { RecipeCreateComponent } from './recipecreate/recipecreate.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'plan-create', component: PlanCreateComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'plan-details/:id', component: PlanDetailsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
  { path: 'recipe/create', component: RecipeCreateComponent },
  { path: 'recipe/:id', component: RecipeCreateComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeDetailsComponent,
    PlanDetailsComponent,
    LoginPageComponent,
    HomePageComponent,
    RecipesComponent,
    PlansComponent,
    PlanCreateComponent,
    RecipeCreateComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'acacia'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // RouterModule.forRoot(routes, { enableTracing: true }),
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    RecipeService,
    PlanService,
    AF
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
