import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AF } from '../providers/af';
import { AppComponent } from '../app.component';
import { RecipeService } from '../providers/recipe.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title = 'Acacia Meal Planning';
  color: string;
  link: string;

  mainButtons = [
    { label: 'View Plans', color: 'primary', link: '/plans' },
    { label: 'Create Plan', color: 'accent', link: '/plan/create' },
    { label: 'View Recipes', color: 'warn' , link: '/recipes'},
    { label: 'Add Recipe', color: 'secondary' , link: '/recipe/create'},
  ];

  public displayName: string;

  constructor(public recipeService: RecipeService, public afService: AF, private db: AngularFireDatabase, 
    public app: AppComponent, private router: Router ) {
    this.displayName = afService.displayName;
  }

  ngOnInit( ) {
    
  }

  navigateTo(link: string): void {
    this.router.navigateByUrl(link);
  }



}
