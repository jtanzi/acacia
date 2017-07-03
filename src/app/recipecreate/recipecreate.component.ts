import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipecreate',
  templateUrl: './recipecreate.component.html',
  styleUrls: ['./recipecreate.component.css']
})
export class RecipeCreateComponent implements OnInit {

  units = [
    'cup(s)',
    'fl oz',
    'oz',
    'tsp',
    'tbsp',
    'liter(s)',
    'pint(s)'
  ];
  constructor(
  ) { }

  ngOnInit() {
  }

}
