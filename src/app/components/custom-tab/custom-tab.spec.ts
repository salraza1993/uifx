import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTab } from './custom-tab';

describe('CustomTab', () => {
  let component: CustomTab;
  let fixture: ComponentFixture<CustomTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
