import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsIconFull } from './buttons-icon-full';

describe('ButtonsIconFull', () => {
  let component: ButtonsIconFull;
  let fixture: ComponentFixture<ButtonsIconFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsIconFull]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsIconFull);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
