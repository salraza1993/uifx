import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsWrapper } from './tabs-wrapper';

describe('TabsWrapper', () => {
  let component: TabsWrapper;
  let fixture: ComponentFixture<TabsWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
