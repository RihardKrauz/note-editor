import { Action } from '@ngrx/store';

export enum UserActionTypes {
  SetSession = '[User] SetSession'
}

export interface UserAction extends Action {
  payload: string;
}

export class SetUserSession implements UserAction {
  readonly type = UserActionTypes.SetSession;
  constructor(public payload: string) {}
}
