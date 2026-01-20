import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeChanger } from './theme-changer';

describe('ThemeChanger', () => {
  let component: ThemeChanger;
  let fixture: ComponentFixture<ThemeChanger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeChanger]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeChanger);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
