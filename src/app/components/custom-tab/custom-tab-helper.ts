import { TabConfig, TabItem } from "./custom-tab-model";

export const DEFAULT_CONFIGS: TabConfig = {
  variant: 'basic',
  showIcon: false,
  iconPosition: 'start',
  tablistClass: 'salman-tab-list',
  tabItemClass: 'salman-tab-item',
  activeTabClass: 'active-tab',
  disabledTabClass: 'disabled-tab',
  tabPanelClass: 'salman-tab-panel',
  orientation: 'horizontal',
  selectionMode: 'follow',
  preserveContent: false,
}
export const TAB_PLACEHOLDER: TabItem[] = [
  { id: 'home', label: 'Home', value: 'home', icon: 'fa-solid fa-home', },
  { id: 'profile', label: 'Profile', value: 'profile', icon: 'fa-solid fa-user' },
  { id: 'messages', label: 'Messages', value: 'messages', icon: 'fa-solid fa-envelope' },
];
