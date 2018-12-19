import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/models/note';
import { Store } from '@ngrx/store';
import { GlobalState } from 'src/app/store/state';
import { selectNotesCount } from 'src/app/store/notes/notes.selectors';

@Component({
  selector: 'app-notes-layout',
  templateUrl: './notes-layout.component.html',
  styleUrls: ['./notes-layout.component.less']
})
export class NotesLayoutComponent implements OnInit {
  @Input() sessionId: string;
  editableNote: Note = new Note(0, '', '', false);
  constructor(private store: Store<GlobalState>) {}

  ngOnInit() {
    this.store.select(selectNotesCount).subscribe(val => (this.editableNote.id = val));
  }
}
