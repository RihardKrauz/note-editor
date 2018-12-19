import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalState } from 'src/app/store/state';
import { newGuid } from 'src/app/utils/math.utils';
import { SetUserSession } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.less']
})
export class NotesViewComponent implements OnInit {
  sessionId: string;
  constructor(private store: Store<GlobalState>) {}

  ngOnInit() {
    this.sessionId = newGuid();

    this.store.dispatch(new SetUserSession(this.sessionId));

    window.onfocus = () => {
      this.store.dispatch(new SetUserSession(this.sessionId));
    };
  }
}
