import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dado } from './dado';

describe('Dado', () => {
  let component: Dado;
  let fixture: ComponentFixture<Dado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
