import { Recipe } from './recipe';

export class Plan {
  date: string;
  weekdays: {
    'Su': Recipe[],
    'M': Recipe[],
    'Tu': Recipe[],
    'W': Recipe[],
    'Th': Recipe[],
    'F': Recipe[],
    'Sa': Recipe[]
  }
}
