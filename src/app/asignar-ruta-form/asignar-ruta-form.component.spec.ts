import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarRutaFormComponent } from './asignar-ruta-form.component';

describe('AsignarRutaFormComponent', () => {
  let component: AsignarRutaFormComponent;
  let fixture: ComponentFixture<AsignarRutaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarRutaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarRutaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
