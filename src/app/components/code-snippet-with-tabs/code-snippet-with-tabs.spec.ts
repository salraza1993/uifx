import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSnippetWithTabs } from './code-snippet-with-tabs';

describe('CodeSnippetWithTabs', () => {
  let component: CodeSnippetWithTabs;
  let fixture: ComponentFixture<CodeSnippetWithTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeSnippetWithTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeSnippetWithTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
