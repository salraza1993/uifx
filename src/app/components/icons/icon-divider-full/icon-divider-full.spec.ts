import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDividerFull } from './icon-divider-full';

describe('IconDividerFull', () => {
  let component: IconDividerFull;
  let fixture: ComponentFixture<IconDividerFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDividerFull]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconDividerFull);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
