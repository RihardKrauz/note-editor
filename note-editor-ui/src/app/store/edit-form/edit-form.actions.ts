import { Action } from '@ngrx/store';

export enum EditFormActionTypes {
  ChangeTitle = '[EditForm] Change title',
  ChangeContent = '[EditForm] Change content'
}

export interface EditFormAction extends Action {
  payload: string;
}

export class ChangeTitle implements EditFormAction {
  readonly type = EditFormActionTypes.ChangeTitle;
  constructor(public payload: string) {}
}

export class ChangeContent implements EditFormAction {
  readonly type = EditFormActionTypes.ChangeContent;
  constructor(public payload: string) {}
}
