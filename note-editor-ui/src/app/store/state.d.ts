import { Note } from '../models/note';

export interface UserState {
  userSessionId?: string;
}

export interface NotesState {
  items?: Note[];
}

export interface EditFormState {
  title?: string;
  content?: string;
}

export interface FilterState {
  filterValue?: string;
  removedState?: boolean;
}

export interface GlobalState {
  notes?: NotesState;
  filter?: FilterState;
  editForm?: EditFormState;
  userState?: UserState;
}
