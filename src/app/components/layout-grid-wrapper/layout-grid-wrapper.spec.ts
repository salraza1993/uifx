import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutGridWrapper } from './layout-grid-wrapper';

describe('LayoutGridWrapper', () => {
  let component: LayoutGridWrapper;
  let fixture: ComponentFixture<LayoutGridWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutGridWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutGridWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
