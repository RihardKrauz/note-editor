import { NotesState } from './state';
import { NotesActionTypes, NoteAction } from './notes.actions';

const INITIAL_STATE: NotesState = {
  items: []
};

export function NotesReducer(state = INITIAL_STATE, action: NoteAction<any>) {
  const notes = state.items || [];

  switch (action.type) {
    case NotesActionTypes.Add:
      notes.push(action.payload);
      return { ...state, items: notes };
    case NotesActionTypes.FetchSuccess:
      return { ...state, items: action.payload };
    case NotesActionTypes.Remove:
      const notesToRemove = notes.filter(note => note.id === action.payload);
      if (notesToRemove.length > 0) {
        notesToRemove[0].isRemoved = true;
      }
      return { ...state, items: notes };
    case NotesActionTypes.Restore:
      const notesToRestore = notes.filter(note => note.id === action.payload);
      if (notesToRestore.length > 0) {
        notesToRestore[0].isRemoved = false;
      }
      return { ...state, items: notes };
    default:
      return state;
  }
}
