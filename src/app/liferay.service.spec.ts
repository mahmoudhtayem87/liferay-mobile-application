import { TestBed } from '@angular/core/testing';

import { LiferayService } from './liferay.service';

describe('LiferayService', () => {
  let service: LiferayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiferayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
