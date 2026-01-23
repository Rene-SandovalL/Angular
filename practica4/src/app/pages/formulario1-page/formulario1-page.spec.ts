import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formulario1Page } from './formulario1-page';

describe('Formulario1Page', () => {
  let component: Formulario1Page;
  let fixture: ComponentFixture<Formulario1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formulario1Page]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formulario1Page);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
