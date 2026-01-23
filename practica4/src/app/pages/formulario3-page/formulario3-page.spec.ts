import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formulario3Page } from './formulario3-page';

describe('Formulario3Page', () => {
  let component: Formulario3Page;
  let fixture: ComponentFixture<Formulario3Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulario3Page]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formulario3Page);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
