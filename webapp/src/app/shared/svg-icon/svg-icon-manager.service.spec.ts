import { TestBed, inject } from '@angular/core/testing';

import { SvgIconManagerService } from './svg-icon-manager.service';

describe('SvgIconManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SvgIconManagerService]
    });
  });

  it('should ...', inject([SvgIconManagerService], (service: SvgIconManagerService) => {
    expect(service).toBeTruthy();
  }));
});
