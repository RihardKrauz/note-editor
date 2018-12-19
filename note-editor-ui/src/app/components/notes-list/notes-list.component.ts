import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/models/note';
import { Observable, interval, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { GlobalState } from 'src/app/store/state';
import { FetchNotes } from 'src/app/store/notes/notes.actions';
import { environment } from 'src/environments/environment';
import { ChangeFilter, ChangeRemoved } from 'src/app/store/filters/filters.actions';
import { SyncState } from 'src/app/store/sync/sync.actions';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.less']
})
export class NotesListComponent implements OnInit {
  @Input() sessionId;
  filterValue: string;
  isFilterInputFocused = false;
  showRemoved = false;
  inputDebounceTime = 300;

  notes$: Observable<Note[]>;
  inputFilterChange = new Subject();
  inputRemovedChange = new Subject();

  constructor(private store: Store<GlobalState>) {
    this.notes$ = this.store.select(state => state.notes.items);
  }

  private isThisTabActive = (): boolean => {
    if (!this.sessionId) {
      return false;
    }
    const storedItemsJson = localStorage.getItem('userState');
    let sharedData;
    if (storedItemsJson) {
      try {
        sharedData = JSON.parse(storedItemsJson);
      } catch (ex) {
        throw new Error('JSON parse error of localStorage store data in filter');
      }
    }
    return this.sessionId !== sharedData.userSessionId;
  }

  onFilterChange(value: string) {
    this.inputFilterChange.next(value);
  }

  onRemovedChange(value: { checked: boolean }) {
    this.inputRemovedChange.next(value.checked);
  }

  onFilterFocus() {
    this.isFilterInputFocused = true;
  }

  onFilterBlur() {
    this.isFilterInputFocused = false;
  }

  ngOnInit() {
    // сбрасывается стэйт перед открытием новой вкладки
    this.store.dispatch(new SyncState());

    this.store
      .select(state => state.notes.items)
      .subscribe(items => {
        if (items.length === 0) {
          this.store.dispatch(new FetchNotes());
        }
      });

    // todo: не стал время тратить, могу предложить более адекватную реализацию
    interval(environment.syncTime || 2000)
      .pipe(filter(this.isThisTabActive))
      .subscribe(() => {
        this.store.dispatch(new SyncState());
        if (this.isFilterInputFocused === false) {
          this.store
            .select(state => state.filter.filterValue)
            .pipe(debounceTime(this.inputDebounceTime))
            .subscribe(value => (this.filterValue = value));
          this.store
            .select(state => state.filter.removedState)
            .pipe(debounceTime(this.inputDebounceTime))
            .subscribe(value => (this.showRemoved = value));
        }
      });

    this.inputFilterChange
      .pipe(debounceTime(this.inputDebounceTime))
      .subscribe(value => this.store.dispatch(new ChangeFilter(value as string)));
    this.inputRemovedChange
      .pipe(debounceTime(this.inputDebounceTime))
      .subscribe(value => this.store.dispatch(new ChangeRemoved(value as boolean)));
  }
}
