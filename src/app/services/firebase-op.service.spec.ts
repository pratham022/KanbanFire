import { TestBed } from '@angular/core/testing';

import { FirebaseOpService } from './firebase-op.service';

describe('FirebaseOpService', () => {
  let service: FirebaseOpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseOpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
