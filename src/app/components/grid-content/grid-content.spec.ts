import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridContent } from './grid-content';

describe('GridContent', () => {
  let component: GridContent;
  let fixture: ComponentFixture<GridContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
