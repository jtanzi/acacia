import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';
import { DragulaModule } from 'ng2-dragula';

import { MatChipsModule, MatInputModule, MatSelectModule, MatButtonModule,
  MatCardModule, MatIconModule, MatGridListModule } from '@angular/material';

import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { DragDropModule } from 'primeng/dragdrop';
import { PasswordModule } from 'primeng/password';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CheckboxModule } from 'primeng/checkbox';

import { RecipeService } from './providers/recipe.service';
import { PlanService } from './providers/plan.service';
import { AF } from './providers/af';

import { AppComponent } from './app.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';

import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipesComponent } from './recipes/recipes.component';
import { PlansComponent } from './plans/plans.component';
import { RecipeFormComponent } from './recipeform/recipeform.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { PlanFormComponent } from './planform/planform.component';
import { TruncatePipe } from './pipes/truncate';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'plan/:id', component: PlanFormComponent },
  { path: 'plan/create', component: PlanFormComponent },
  { path: 'plan-details/:id', component: PlanDetailsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
  { path: 'recipe/create', component: RecipeFormComponent },
  { path: 'recipe/:id', component: RecipeFormComponent },
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
    RecipeFormComponent,
    PageNotFoundComponent,
    PlanFormComponent,
    TruncatePipe
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase), // Named apps not supported in current version of AngularFire2
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    ChipsModule,
    DragDropModule,
    DragulaModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    KeyFilterModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    PanelModule,
    PasswordModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    SelectButtonModule,
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
