import { Component } from '@angular/core';
import { CodeSnippetWithTabs } from '@app/components/code-snippet-with-tabs/code-snippet-with-tabs';
import { CodeSnippet } from '@app/components/code-snippet/code-snippet';
import { HeroTitle } from '@app/components/hero-title/hero-title';
import { TabsIconFull } from '@app/components/icons/tabs-icon-full/tabs-icon-full';
import { SectionWrapper } from '@app/components/section-wrapper/section-wrapper';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { Divider } from '../divider/divider';

@Component({
  selector: 'tabs, sr-tabs',
  imports: [
    ContentWrapper,
    CodeSnippet,
    CodeSnippetWithTabs,
    HeroTitle,
    TabsIconFull,
    SectionWrapper,
    Divider
  ],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
  host: {
    class: 'tabs-page-host block w--full'
  }
})
export class Tabs {
  editorCode = `<custom-tab [tabs]="tabsList" [tabConfigs]="tabConfigs">
  <ng-template #tabs let-tab>
    {{ tab.label }}
  </ng-template>
  <ng-template #tabsContent let-tab>
    <div class="p--xl">
      <h3>{{ tab.label }} Content</h3>
      <p>This is the content for {{ tab.label }} tab.</p>
    </div>
  </ng-template>
</custom-tab>

<!-- In your component.ts -->
import { Component } from '@angular/core';
import { TabItem, TabConfig } from './custom-tab-model';

@Component({
  selector: 'your-component',
  templateUrl: './your-component.html',
  styleUrl: './your-component.css'
})
export class YourComponent {
  tabsList: TabItem[] = [
    { label: 'Tab 1', value: 'tab1', selected: true },
    { label: 'Tab 2', value: 'tab2' },
    { label: 'Tab 3', value: 'tab3', disabled: true }
  ];
  `;
}
