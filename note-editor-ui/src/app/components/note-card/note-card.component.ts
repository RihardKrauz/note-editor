import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/models/note';
import { Store } from '@ngrx/store';
import { GlobalState } from 'src/app/store/state';
import { RemoveNote, RestoreNote } from 'src/app/store/notes.actions';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.less']
})
export class NoteCardComponent implements OnInit {
  @Input() model: Note;
  constructor(private store: Store<GlobalState>) {}

  ngOnInit() {}

  removeNote(event: Event) {
    event.preventDefault();
    this.store.dispatch(new RemoveNote(this.model.id));
  }

  restoreNote(event: Event) {
    event.preventDefault();
    this.store.dispatch(new RestoreNote(this.model.id));
  }
}
