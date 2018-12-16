import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note';
import { Observable, interval } from 'rxjs';
import { Store } from '@ngrx/store';
import { GlobalState } from 'src/app/store/state';
import { FetchNotes, SyncNotes } from 'src/app/store/notes.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.less']
})
export class NotesListComponent implements OnInit {
  filterValue: string;
  notes$: Observable<Note[]>;
  constructor(private store: Store<GlobalState>) {
    this.notes$ = this.store.select(state => state.notes.items);
  }

  ngOnInit() {
    this.store.dispatch(new FetchNotes());

    interval(environment.syncTime || 2000).subscribe(() => {
      this.store.dispatch(new SyncNotes());
    });
  }
}
