import { TestBed } from '@angular/core/testing';

import { ProductaddService } from './productadd.service';

describe('ProductaddService', () => {
  let service: ProductaddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductaddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
