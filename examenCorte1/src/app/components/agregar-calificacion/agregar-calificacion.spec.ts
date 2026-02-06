import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCalificacion } from './agregar-calificacion';

describe('AgregarCalificacion', () => {
  let component: AgregarCalificacion;
  let fixture: ComponentFixture<AgregarCalificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarCalificacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCalificacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
