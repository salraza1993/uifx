import { Component, signal } from '@angular/core';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { CustomTab } from '@components/custom-tab/custom-tab';
import { TabItem } from '@components/custom-tab/custom-tab-model';

@Component({
  selector: 'sr-home',
  imports: [ContentWrapper, CustomTab],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  activeTab = signal('profile');
  protected tabsPlaceholder = signal<TabItem[]>([
    { id: 'home', label: 'Home', value: 'home', selected: false, icon: 'fa-solid fa-house' },
    { id: 'profile', label: 'Profile', value: 'profile', selected: false, icon: 'fa-solid fa-user' },
    { id: 'messages', label: 'Messages', value: 'messages', selected: false, icon: 'fa-solid fa-envelope' },
  ]);
}
