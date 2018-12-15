import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotesViewComponent } from './components/notes-view/notes-view.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesLayoutComponent } from './components/notes-layout/notes-layout.component';

import { MatCardModule, MatButtonModule } from '@angular/material';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteCardComponent } from './components/note-card/note-card.component';

@NgModule({
  declarations: [AppComponent, NotesViewComponent, NotesLayoutComponent, NotesListComponent, NoteCardComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, MatCardModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
