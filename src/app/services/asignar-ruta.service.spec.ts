import { TestBed } from '@angular/core/testing';

import { AsignarRutaService } from './asignar-ruta.service';

describe('AsignarRutaService', () => {
  let service: AsignarRutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignarRutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
