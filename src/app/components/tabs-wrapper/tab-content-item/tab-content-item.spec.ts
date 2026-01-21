import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabContentItem } from './tab-content-item';

describe('TabContent', () => {
  let component: TabContentItem;
  let fixture: ComponentFixture<TabContentItem>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabContentItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TabContentItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
