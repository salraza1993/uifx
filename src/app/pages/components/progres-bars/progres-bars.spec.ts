import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresBars } from './progres-bars';

describe('ProgresBars', () => {
  let component: ProgresBars;
  let fixture: ComponentFixture<ProgresBars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgresBars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgresBars);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
