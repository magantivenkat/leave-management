import { TestBed } from '@angular/core/testing';

import { Holidays } from './holidays.service';

describe('Holidays', () => {
  let service: Holidays;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Holidays);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
