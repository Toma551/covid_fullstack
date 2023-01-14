import { TestBed } from '@angular/core/testing';

import { LoadPermissionService } from './load-permission.service';

describe('LoadPermissionService', () => {
  let service: LoadPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
