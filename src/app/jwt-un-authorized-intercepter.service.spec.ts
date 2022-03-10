import { TestBed } from '@angular/core/testing';

import { JwtUnAuthorizedIntercepterService } from './jwt-un-authorized-intercepter.service';

describe('JwtUnAuthorizedIntercepterService', () => {
  let service: JwtUnAuthorizedIntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtUnAuthorizedIntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
