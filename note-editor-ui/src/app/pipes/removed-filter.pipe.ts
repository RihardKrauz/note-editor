import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note';

@Pipe({
  name: 'removedFilter',
  pure: false
})
export class RemovedFilterPipe implements PipeTransform {
  transform(items: Note[], showRemoved: boolean): any {
    return showRemoved === false ? items.filter(item => item.isRemoved === false) : items;
  }
}
