import { GlobalState, NotesState } from '../state';
import { createSelector } from '@ngrx/store';

const getNotesState = (state: GlobalState) => state.notes;

export const selectNotesCount = createSelector(
  getNotesState,
  (state: NotesState) => state.items.length
);
