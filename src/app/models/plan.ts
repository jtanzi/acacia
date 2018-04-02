import { Recipe } from './recipe';
import * as moment from 'moment';

export class Plan {
  startDate: Date;
  endDate: Date;
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
