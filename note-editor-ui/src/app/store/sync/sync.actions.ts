import { Action } from '@ngrx/store';

export enum SyncActionTypes {
  Synchronize = '[Sync] Synchronize'
}

export class SyncState implements Action {
  readonly type = SyncActionTypes.Synchronize;
}
