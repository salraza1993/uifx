/**
 * Custom Tab Component Models
 * Defines the structure and configuration for tab items and tab settings.
 * @interface TabItem - Represents a single tab item with properties like id, label, value, icon, etc.
 * @props id: any - Unique identifier for the tab.
 * @props label: string - Display label for the tab.
 * @props value: string - Value associated with the tab.
 * @props selected?: boolean - Indicates if the tab is selected.
 * @props icon?: string - Icon associated with the tab.
 * @props disabled?: boolean - Indicates if the tab is disabled.
 * @props command?: () => void - Optional command function to execute on tab action.
 */
export interface TabItem {
  id: any;
  label: string;
  value: string;
  selected?: boolean;
  icon?: string | { start?: string; end?: string };
  disabled?: boolean;
  command?: () => void;
}

/**
 * Tab Configuration Interface
 * Defines the configuration options for the tab component.
 * @interface TabConfig - Represents configuration settings for tabs.
 * @props showIcon?: boolean - Flag to show or hide icons on tabs.
 * @props iconPosition?: 'start' | 'end' - Position of the icon relative to the label.
 * @props tabClass?: string - CSS class for the tab element.
 * @props activeTabClass?: string - CSS class for the active tab element.
 * @props disabledTabClass?: string - CSS class for disabled tab elements.
 * @props tabPanelClass?: string - CSS class for the tab panel element.
 */
export interface TabConfig {
  variant?: 'basic' | 'boxed' | 'underline' | 'pills';
  showIcon?: boolean;
  tablistClass?: string;
  tabItemClass?: string;
  activeTabClass?: string;
  disabledTabClass?: string;
  tabPanelClass?: string;
  orientation?: 'horizontal' | 'vertical';
  tabsInLoop?: boolean;
  selectionMode?: 'follow' | 'explicit';
  softDisabled?: boolean;
  showDefaultContent?: boolean;
  preserveContent?: boolean;
}
