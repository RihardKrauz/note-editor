import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note';

@Pipe({
  name: 'titleFilter',
  pure: false
})
export class TitleFilterPipe implements PipeTransform {
  transform(items: Note[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.title.indexOf(filter) !== -1);
  }
}
