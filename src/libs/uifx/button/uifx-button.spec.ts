import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UifxButton } from './uifx-button';

describe('UifxButton', () => {
  let component: UifxButton;
  let fixture: ComponentFixture<UifxButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UifxButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UifxButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
