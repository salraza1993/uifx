import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroTitle } from './hero-title';

describe('HeroTitle', () => {
  let component: HeroTitle;
  let fixture: ComponentFixture<HeroTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
