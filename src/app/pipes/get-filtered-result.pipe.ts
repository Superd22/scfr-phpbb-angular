import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFilteredResult'
})
export class GetFilteredResultPipe implements PipeTransform {

  transform(value: any, copy: FilteredResults<any>): any {
    copy.filtered = value;
    return value;
  }
}

export interface FilteredResults<T> {
  filtered: T
}
