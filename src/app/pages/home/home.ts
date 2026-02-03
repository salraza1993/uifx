import { Component, signal } from '@angular/core';
import { TabConfig, TabItem } from '@app/components/custom-tab/models/custom-tab-model';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { CustomTab } from '@components/custom-tab/custom-tab';

@Component({
  selector: 'sr-home',
  imports: [ContentWrapper, CustomTab],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  tabConfigs = signal<TabConfig>({
    showIcon: false,
    selectionMode: 'explicit'
  });
  activeTab = signal('profile');
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
      icon: { start: 'fa-solid fa-user' },
      disabled: true
    },
    {
      id: 'messages',
      label: 'Messages',
      value: 'messages',
      selected: false,
      icon: { start: 'fa-solid fa-envelope', end: 'fa-solid fa-circle-info' }
    }
  ]);
}
