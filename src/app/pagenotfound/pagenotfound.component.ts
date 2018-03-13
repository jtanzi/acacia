import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  navButtons = [
    { label: 'View Plans', color: 'primary', link: '/plans' },
    { label: 'Create Plan', color: 'accent', link: '/plan/create' },
    { label: 'View Recipes', color: 'warn' , link: '/recipes'},
    { label: 'Add Recipe', color: 'secondary' , link: '/recipe/create'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
