import { Actions, ofType, Effect } from '@ngrx/effects';
import { NotesActionTypes, FetchNotesSuccess } from './notes.actions';
import { Injectable } from '@angular/core';
import { NotesInteractionService } from '../../services/notes-interaction.service';
import { mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NotesState } from '../state';

@Injectable()
export class NotesEffects {
  constructor(
    private store: Store<NotesState>,
    private actions$: Actions,
    private notesInteractionService: NotesInteractionService
  ) {}

  @Effect({ dispatch: false })
  fetchNotes$ = this.actions$.pipe(
    ofType(NotesActionTypes.Fetch),
    mergeMap(() => this.notesInteractionService.getNotes()),
    tap(result => this.store.dispatch(new FetchNotesSuccess(result)))
  );
}
