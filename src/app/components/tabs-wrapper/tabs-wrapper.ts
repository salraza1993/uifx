import { Tabs } from '@angular/aria/tabs';
import { Component, input } from '@angular/core';

@Component({
  selector: 'tabs-wrapper',
  imports: [Tabs],
  template: `
    <div class="tabs-wrapper-content" ngTabs>
      <ng-content select="tabs-header"></ng-content>
      <ng-content select="tabs-body"></ng-content>
    </div>
  `,
  styleUrl: './tabs-wrapper.css',
  host: {
    class: 'tabs-wrapper-host',
  },
})
export class TabsWrapper {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
}
