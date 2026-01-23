import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBars } from './progress-bars';

describe('ProgressBars', () => {
  let component: ProgressBars;
  let fixture: ComponentFixture<ProgressBars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBars);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
