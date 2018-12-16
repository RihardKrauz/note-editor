import { Action } from '@ngrx/store';
import { Note } from '../models/note';

export enum NotesActionTypes {
  Add = '[Notes] Add',
  Remove = '[Notes] Remove',
  Restore = '[Notes] Restore',
  Fetch = '[Notes] Fetch',
  FetchSuccess = '[Notes] FetchSuccess'
}

export interface NoteAction<T> extends Action {
  payload?: T;
}

export class FetchNotes implements NoteAction<undefined> {
  readonly type = NotesActionTypes.Fetch;
}

export class FetchNotesSuccess implements NoteAction<Note[]> {
  readonly type = NotesActionTypes.FetchSuccess;
  constructor(public payload: Note[]) {}
}

export class AddNote implements NoteAction<Note> {
  readonly type = NotesActionTypes.Add;
  constructor(public payload: Note) {}
}

export class RemoveNote implements NoteAction<number> {
  readonly type = NotesActionTypes.Remove;
  constructor(public payload: number) {}
}

export class RestoreNote implements NoteAction<number> {
  readonly type = NotesActionTypes.Restore;
  constructor(public payload: number) {}
}
