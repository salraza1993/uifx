import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsBody } from './tabs-body';

describe('TabsBody', () => {
  let component: TabsBody;
  let fixture: ComponentFixture<TabsBody>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsBody]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsBody);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
