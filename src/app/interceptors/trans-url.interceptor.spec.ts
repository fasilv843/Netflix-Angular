import { TestBed } from '@angular/core/testing';

import { TransUrlInterceptor } from './trans-url.interceptor';

describe('TransUrlInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TransUrlInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TransUrlInterceptor = TestBed.inject(TransUrlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
