import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UifxDivider } from './uifx-divider';

describe('UifxDivider', () => {
  let component: UifxDivider;
  let fixture: ComponentFixture<UifxDivider>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UifxDivider]
    }).compileComponents();

    fixture = TestBed.createComponent(UifxDivider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
