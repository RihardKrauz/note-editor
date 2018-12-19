import { EditFormState } from '../state';
import { EditFormAction, EditFormActionTypes } from './edit-form.actions';
import { SyncActionTypes } from '../sync/sync.actions';

const INITIAL_STATE: EditFormState = {
  title: '',
  content: ''
};

export function EditFormReducer(state = INITIAL_STATE, action: EditFormAction) {
  switch (action.type) {
    case EditFormActionTypes.ChangeTitle:
      return { ...state, title: action.payload };
    case EditFormActionTypes.ChangeContent:
      return { ...state, content: action.payload };
    case SyncActionTypes.Synchronize:
      const storedItemsJson = localStorage.getItem('editForm');
      let sharedData = { ...state };
      if (storedItemsJson) {
        try {
          sharedData = JSON.parse(storedItemsJson);
        } catch (ex) {
          throw new Error('JSON parse error of localStorage store data in editForm');
        }
      }
      return { ...state, title: sharedData.title, content: sharedData.content };
  }

  return { ...state };
}
