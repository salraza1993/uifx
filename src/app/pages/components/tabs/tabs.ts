import { Component, signal } from '@angular/core';
import { CustomTab } from '@app/components/custom-tab/custom-tab';
import { CustomTabItem } from '@app/components/custom-tab/custom-tab-item';
import { CustomTabPanel } from '@app/components/custom-tab/custom-tab-panel';
import { CustomTabPanels } from '@app/components/custom-tab/custom-tab-panels';
import { CustomTablist } from '@app/components/custom-tab/custom-tablist';
import { TabItem } from '@app/components/custom-tab/models/custom-tab-model';
import { GridContent } from '@app/components/grid-content/grid-content';
import { HeroTitle } from '@app/components/hero-title/hero-title';
import { TabsIconFull } from '@app/components/icons/tabs-icon-full/tabs-icon-full';
import { Divider } from '@app/components/library/divider/divider';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';

@Component({
  selector: 'tabs, sr-tabs',
  imports: [
    ContentWrapper,
    HeroTitle,
    TabsIconFull,
    GridContent,
    Divider,
    CustomTab,
    CustomTabPanels,
    CustomTabPanel,
    CustomTablist,
    CustomTabItem
  ],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
  host: {
    class: 'tabs-page-host block w--full'
  }
})
export class Tabs {
  protected tabsPlaceholder = signal<TabItem[]>([
    {
      id: 'home',
      label: 'Home',
      value: 'home',
      selected: false,
      icon: { start: 'fa-solid fa-house', end: 'fa-solid fa-circle-info' }
    },
    {
      id: 'profile',
      label: 'Profile',
      value: 'profile',
      selected: false,
      icon: { start: 'fa-solid fa-user' }
    },
    {
      id: 'messages',
      label: 'Messages',
      value: 'messages',
      selected: false,
      icon: { start: 'fa-solid fa-envelope', end: 'fa-solid fa-circle-info' }
    }
  ]);
  activeTab = signal<string>('home');

  tabs = signal([
    { title: 'Tab 1', value: '0', content: 'Tab 1 Content - Dynamic from array' },
    { title: 'Tab 2', value: '1', content: 'Tab 2 Content - Dynamic from array' },
    { title: 'Tab 3', value: '2', content: 'Tab 3 Content - Dynamic from array' }
  ]);

  people = signal([
    {
      id: 1,
      value: 'amy',
      name: 'Amy Elsner',
      avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
      content: 'Senior Developer with 10+ years of experience in web technologies.'
    },
    {
      id: 2,
      value: 'onyama',
      name: 'Onyama Limba',
      avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png',
      content: 'Product Designer specializing in user experience and interface design.'
    },
    {
      id: 3,
      value: 'ioni',
      name: 'Ioni Bowcher',
      avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png',
      content: 'Project Manager leading cross-functional teams.',
      badge: '2'
    }
  ]);
}
