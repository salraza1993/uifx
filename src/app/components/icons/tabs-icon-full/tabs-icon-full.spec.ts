import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsIconFull } from './tabs-icon-full';

describe('TabsIconFull', () => {
  let component: TabsIconFull;
  let fixture: ComponentFixture<TabsIconFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsIconFull]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsIconFull);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
