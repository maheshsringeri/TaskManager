import { TestBed } from '@angular/core/testing';

import { TaskPrioritieService } from './task-priorities.service';

describe('TaskPrioritiesServiceService', () => {
  let service: TaskPrioritieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskPrioritieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
