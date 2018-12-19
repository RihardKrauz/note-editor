import { Action } from '@ngrx/store';

export enum FilterActionTypes {
  Change = '[Filter] Change',
  Removed = '[Filter] Removed'
}

export interface FilterAction<T> extends Action {
  payload?: T;
}

export class ChangeFilter implements FilterAction<string> {
  readonly type = FilterActionTypes.Change;
  constructor(public payload: string) {}
}

export class ChangeRemoved implements FilterAction<boolean> {
  readonly type = FilterActionTypes.Removed;
  constructor(public payload: boolean) {}
}
