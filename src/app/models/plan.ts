import { Recipe } from './recipe';
import * as moment from 'moment';

export class Plan {
  id: string;
  startDate: string;
  endDate: string;
  weekdays: {
    'Su': Recipe[],
    'M': Recipe[],
    'Tu': Recipe[],
    'W': Recipe[],
    'Th': Recipe[],
    'F': Recipe[],
    'Sa': Recipe[]
  };
  ingredientList: any[];
}
