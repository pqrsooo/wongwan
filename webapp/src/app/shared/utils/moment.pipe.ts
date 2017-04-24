import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentFormatPipe implements PipeTransform {
  transform(value: moment.Moment, ...args: string[]): string {
    switch (args[0]) {
      case 'date': {
        return value.format('LL');
      }
      case 'time': {
        return value.format('LT');
      }
      default: {
        return value.format('LLLL');
      }
    }
  }
}
