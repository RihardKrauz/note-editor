import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotesViewComponent } from './components/notes-view/notes-view.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesLayoutComponent } from './components/notes-layout/notes-layout.component';

import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { TitleFilterPipe } from './pipes/title-filter.pipe';
import { FormsModule } from '@angular/forms';

import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { NotesReducer } from './store/notes.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NotesEffects } from './store/notes.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GlobalState } from './store/state';
import { localStorageSync } from 'ngrx-store-localstorage';

const reducers: ActionReducerMap<GlobalState> = { notes: NotesReducer };

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['notes'] })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    NotesViewComponent,
    NotesLayoutComponent,
    NotesListComponent,
    NoteCardComponent,
    TitleFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
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
