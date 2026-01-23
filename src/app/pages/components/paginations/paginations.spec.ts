import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paginations } from './paginations';

describe('Paginations', () => {
  let component: Paginations;
  let fixture: ComponentFixture<Paginations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paginations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paginations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
