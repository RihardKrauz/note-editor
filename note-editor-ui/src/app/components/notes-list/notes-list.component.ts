import { Component, OnInit } from '@angular/core';
import { NotesInteractionService } from '../../services/notes-interaction.service';
import { Note } from 'src/app/models/note';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.less']
})
export class NotesListComponent implements OnInit {
  notes$: Observable<Note[]>;
  constructor(private notesInteractionService: NotesInteractionService) {}

  ngOnInit() {
    this.notes$ = this.notesInteractionService.getNotes();
  }
}
