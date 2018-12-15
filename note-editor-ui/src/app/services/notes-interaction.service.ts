import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { of } from 'rxjs';
import { NoteFolder } from '../models/note-folder';

const NOTES: Note[] = [
  {
    id: 1,
    title: 'test1',
    content: 'val1',
    isRemoved: false
  },
  {
    id: 2,
    title: 'test2',
    content: 'val2',
    isRemoved: false
  }
];

@Injectable({
  providedIn: 'root'
})
export class NotesInteractionService {
  constructor() {}

  getNotes = () => of(NOTES);
}
