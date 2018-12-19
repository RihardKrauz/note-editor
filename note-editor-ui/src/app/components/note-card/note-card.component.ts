import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/models/note';
import { Store } from '@ngrx/store';
import { GlobalState } from 'src/app/store/state';
import { RemoveNote, RestoreNote, AddNote } from 'src/app/store/notes/notes.actions';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ChangeTitle, ChangeContent, EditFormAction } from 'src/app/store/edit-form/edit-form.actions';
import { interval, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.less']
})
export class NoteCardComponent implements OnInit {
  @Input() model: Note;
  @Input() editMode: boolean;

  noteEditForm: FormGroup;
  isFormControlsFocused = false;

  constructor(private store: Store<GlobalState>, private formBuilder: FormBuilder) {}

  private syncControl(stateSelector: Observable<string>, fieldControl: AbstractControl) {
    interval(environment.syncTime || 2000)
      .pipe(
        filter(() => this.isFormControlsFocused === false),
        mergeMap(() => stateSelector.pipe(distinctUntilChanged()))
      )
      .subscribe(val => {
        fieldControl.setValue(val);
      });
  }

  private setFieldValueAction(
    control: AbstractControl,
    action: EditFormAction,
    modelFieldCallback: (value: string) => void
  ) {
    control.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(val => {
        action.payload = val;
        this.store.dispatch(action);
        modelFieldCallback(val);
      });
  }

  ngOnInit() {
    if (this.editMode === true) {
      this.initForm();
    }
  }

  initForm() {
    this.noteEditForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });

    this.noteEditForm.reset();

    this.syncControl(this.store.select(state => state.editForm.title), this.noteEditForm.controls.title);
    this.syncControl(this.store.select(state => state.editForm.content), this.noteEditForm.controls.content);

    this.setFieldValueAction(this.noteEditForm.controls.title, new ChangeTitle(''), val => (this.model.title = val));
    this.setFieldValueAction(
      this.noteEditForm.controls.content,
      new ChangeContent(''),
      val => (this.model.content = val)
    );
  }

  onFormControlFocused() {
    this.isFormControlsFocused = true;
  }

  onFormControlBlured() {
    this.isFormControlsFocused = false;
  }

  removeNote(event: Event) {
    event.preventDefault();
    this.store.dispatch(new RemoveNote(this.model.id));
  }

  restoreNote(event: Event) {
    event.preventDefault();
    this.store.dispatch(new RestoreNote(this.model.id));
  }

  saveNote(event: Event) {
    event.preventDefault();
    this.store.dispatch(new AddNote(new Note(this.model.id, this.model.title, this.model.content, false)));
    this.noteEditForm.reset();
  }

  clearForm(event: Event) {
    event.preventDefault();
    this.noteEditForm.reset();
  }
}
