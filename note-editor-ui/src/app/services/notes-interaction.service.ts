import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { of } from 'rxjs';

const NOTES: Note[] = [
  {
    id: 1,
    title: 'Заметка 1',
    content: 'Содержание заметки 1',
    isRemoved: false
  },
  {
    id: 2,
    title: 'Заметка 2',
    content: 'Содержание заметки 2',
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
