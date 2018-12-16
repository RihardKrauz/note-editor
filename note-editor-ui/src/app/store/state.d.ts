import { Note } from '../models/note';

export interface NotesState {
  items?: Note[];
}

export interface GlobalState {
  notes?: NotesState;
}
