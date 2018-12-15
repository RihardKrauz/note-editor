import { TestBed } from '@angular/core/testing';

import { NotesInteractionService } from './notes-interaction.service';

describe('NotesInteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesInteractionService = TestBed.get(NotesInteractionService);
    expect(service).toBeTruthy();
  });
});
