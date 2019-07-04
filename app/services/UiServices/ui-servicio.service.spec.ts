import { TestBed } from '@angular/core/testing';

import { UiServicioService } from './ui-servicio.service';

describe('UiServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiServicioService = TestBed.get(UiServicioService);
    expect(service).toBeTruthy();
  });
});
