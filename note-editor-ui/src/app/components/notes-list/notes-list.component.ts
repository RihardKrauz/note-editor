import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GlobalState } from 'src/app/store/state';
import { FetchNotes } from 'src/app/store/notes.actions';

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
  }
}
