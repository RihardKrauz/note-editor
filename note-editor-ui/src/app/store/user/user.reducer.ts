import { UserState } from '../state';
import { UserAction, UserActionTypes } from './user.actions';
import { SyncActionTypes } from '../sync/sync.actions';

const INITIAL_STATE: UserState = {
  userSessionId: ''
};

export function UserReducer(state = INITIAL_STATE, action: UserAction) {
  switch (action.type) {
    case UserActionTypes.SetSession:
      return { ...state, userSessionId: action.payload };
    case SyncActionTypes.Synchronize:
      const storedItemsJson = localStorage.getItem('userState');
      let sharedData = { ...state };
      if (storedItemsJson) {
        try {
          sharedData = JSON.parse(storedItemsJson);
        } catch (ex) {
          throw new Error('JSON parse error of localStorage store data in filter');
        }
      }
      return { ...state, userSessionId: sharedData.userSessionId };
  }

  return { ...state };
}
