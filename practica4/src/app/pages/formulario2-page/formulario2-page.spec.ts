import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formulario2Page } from './formulario2-page';

describe('Formulario2Page', () => {
  let component: Formulario2Page;
  let fixture: ComponentFixture<Formulario2Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulario2Page]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formulario2Page);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
