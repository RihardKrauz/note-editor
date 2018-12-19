import { FilterState } from '../state';
import { FilterAction, FilterActionTypes } from './filters.actions';
import { SyncActionTypes } from '../sync/sync.actions';

const INITIAL_STATE: FilterState = {
  filterValue: '',
  removedState: false
};

export function FilterReducer(state = INITIAL_STATE, action: FilterAction<any>) {
  switch (action.type) {
    case FilterActionTypes.Change:
      return { ...state, filterValue: action.payload };
    case FilterActionTypes.Removed:
      return { ...state, removedState: action.payload };
    case SyncActionTypes.Synchronize:
      const storedItemsJson = localStorage.getItem('filter');
      let sharedData = { ...state };
      if (storedItemsJson) {
        try {
          sharedData = JSON.parse(storedItemsJson);
        } catch (ex) {
          throw new Error('JSON parse error of localStorage store data in filter');
        }
      }
      return { ...state, filterValue: sharedData.filterValue, removedState: sharedData.removedState };
  }

  return { ...state };
}
