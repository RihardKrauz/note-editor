import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotesViewComponent } from './components/notes-view/notes-view.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesLayoutComponent } from './components/notes-layout/notes-layout.component';

import {
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule
} from '@angular/material';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { TitleFilterPipe } from './pipes/title-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { NotesReducer } from './store/notes/notes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NotesEffects } from './store/notes/notes.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GlobalState } from './store/state';
import { localStorageSync } from 'ngrx-store-localstorage';
import { FilterReducer } from './store/filters/filters.reducers';
import { RemovedFilterPipe } from './pipes/removed-filter.pipe';
import { EditFormReducer } from './store/edit-form/edit-form.reducer';
import { UserReducer } from './store/user/user.reducer';

const reducers: ActionReducerMap<GlobalState> = {
  notes: NotesReducer,
  filter: FilterReducer,
  editForm: EditFormReducer,
  userState: UserReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['notes', 'filter', 'editForm', 'userState']
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    NotesViewComponent,
    NotesLayoutComponent,
    NotesListComponent,
    NoteCardComponent,
    TitleFilterPipe,
    RemovedFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([NotesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
