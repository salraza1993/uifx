\*\*\*\*# Advanced Tab Items as Templates Guide

Using complex tab data structures with Angular templates for flexible and dynamic tab rendering.

---

## Table of Contents

1. [Basic Tab Items Structure](#basic-tab-items-structure)
2. [Extended Tab Item Interface](#extended-tab-item-interface)
3. [Usage Examples](#usage-examples)
4. [Template Patterns](#template-patterns)
5. [Real-World Scenarios](#real-world-scenarios)

---

## Basic Tab Items Structure

### Current TabItem Interface

```typescript
export interface TabItem {
  id: any;
  label: string;
  value: string;
  selected?: boolean;
  icon?: string;
  iconClass?: string;
  disabled?: boolean;
  command?: () => void;
}
```

---

## Extended Tab Item Interface

### Approach 1: Add Metadata Object

```typescript
export interface IconData {
  start?: string | IconTemplate;
  end?: string | IconTemplate;
  class?: string;
  color?: string;
}

export interface IconTemplate {
  type: 'svg' | 'emoji' | 'image' | 'custom';
  content: string;
  props?: Record<string, any>;
}

export interface ExtendedTabItem extends TabItem {
  icon?: {
    start?: string;
    end?: string;
  };
  badge?: {
    label: string;
    color?: 'primary' | 'danger' | 'success' | 'warning';
  };
  metadata?: {
    description?: string;
    count?: number;
    status?: 'active' | 'inactive' | 'pending';
    color?: string;
    avatar?: string;
  };
}
```

---

## Usage Examples

### Example 1: Icon Objects with Start/End Properties

```typescript
@Component({
  selector: 'app-icon-objects-demo',
  imports: [CustomTab],
  template: `
    <custom-tab [tabs]="tabsWithIcons()" [tabConfigs]="config">
      <ng-template #icon let-tab="tab">
        <div class="icon-container">
          <!-- Start Icon -->
          @if (tab.icon?.start) {
            <span class="icon-item">
              <i [class]="tab.icon.start"></i>
            </span>
          }

          <!-- End Icon (Badge) -->
          @if (tab.icon?.end) {
            <span class="icon-item icon-badge">
              <i [class]="tab.icon.end"></i>
            </span>
          }
        </div>
      </ng-template>

      <ng-template #tabs let-tab="tab">
        <span class="tab-label">{{ tab.label }}</span>
      </ng-template>
    </custom-tab>
  `,
  styles: [
    `
      .icon-container {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        justify-content: space-between;
      }

      .icon-item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .icon-badge {
        background-color: #ff4444;
        color: white;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        font-size: 12px;
      }
    `
  ]
})
export class IconObjectsDemo {
  tabsWithIcons = signal<ExtendedTabItem[]>([
    {
      id: 1,
      label: 'Inbox',
      value: 'inbox',
      icon: {
        start: 'fa fa-inbox',
        end: 'fa fa-exclamation' // Alert icon
      }
    },
    {
      id: 2,
      label: 'Sent',
      value: 'sent',
      icon: {
        start: 'fa fa-paper-plane',
        end: 'fa fa-check' // Success icon
      }
    },
    {
      id: 3,
      label: 'Drafts',
      value: 'drafts',
      icon: {
        start: 'fa fa-file-text'
        // No end icon
      }
    }
  ]);

  config: TabConfig = {
    showIcon: true,
    iconPosition: 'both',
    variant: 'boxed'
  };
}
```

---

### Example 2: Tab Items with Badges

```typescript
@Component({
  selector: 'app-badge-tabs-demo',
  imports: [CustomTab, CommonModule],
  template: `
    <custom-tab [tabs]="tabsWithBadges()" [tabConfigs]="config">
      <!-- Badge Icon Template -->
      <ng-template #icon let-tab="tab">
        @if (tab.badge) {
          <span class="badge" [class]="'badge-' + tab.badge.color">
            {{ tab.badge.label }}
          </span>
        }
      </ng-template>

      <!-- Tab Label Template -->
      <ng-template #tabs let-tab="tab">
        <span class="label-with-description">
          <strong>{{ tab.label }}</strong>
          @if (tab.metadata?.description) {
            <small>{{ tab.metadata.description }}</small>
          }
        </span>
      </ng-template>

      <!-- Content Template -->
      <ng-template #tabsContent let-tab="tab">
        <div class="tab-content">
          <h4>{{ tab.label }}</h4>
          @if (tab.metadata?.count) {
            <p>Count: {{ tab.metadata.count }}</p>
          }
          <p>{{ tab.metadata?.description }}</p>
        </div>
      </ng-template>
    </custom-tab>
  `,
  styles: [
    `
      .badge {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: bold;
        color: white;
        margin-left: 8px;
      }

      .badge-primary {
        background-color: #007bff;
      }

      .badge-danger {
        background-color: #dc3545;
      }

      .badge-success {
        background-color: #28a745;
      }

      .badge-warning {
        background-color: #ffc107;
        color: #333;
      }

      .label-with-description {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      small {
        opacity: 0.7;
        font-size: 12px;
      }
    `
  ]
})
export class BadgeTabsDemo {
  tabsWithBadges = signal<ExtendedTabItem[]>([
    {
      id: 1,
      label: 'Notifications',
      value: 'notifications',
      badge: {
        label: '5 New',
        color: 'danger'
      },
      metadata: {
        description: 'View all notifications',
        count: 5,
        status: 'active'
      }
    },
    {
      id: 2,
      label: 'Messages',
      value: 'messages',
      badge: {
        label: '2 Unread',
        color: 'primary'
      },
      metadata: {
        description: 'Chat conversations',
        count: 2
      }
    },
    {
      id: 3,
      label: 'Tasks',
      value: 'tasks',
      badge: {
        label: 'Completed',
        color: 'success'
      },
      metadata: {
        description: 'Your task list',
        status: 'pending'
      }
    }
  ]);

  config: TabConfig = {
    showIcon: true,
    iconPosition: 'end',
    variant: 'pill'
  };
}
```

---

### Example 3: Rich Tab Items with Status Indicators

```typescript
@Component({
  selector: 'app-status-tabs-demo',
  imports: [CustomTab, CommonModule],
  template: `
    <custom-tab [tabs]="tabsWithStatus()" [tabConfigs]="config">
      <!-- Rich Icon Template -->
      <ng-template #icon let-tab="tab">
        <div class="icon-wrapper">
          <!-- Avatar -->
          @if (tab.metadata?.avatar) {
            <img [src]="tab.metadata.avatar" alt="{{ tab.label }}" class="tab-avatar" />
          }

          <!-- Status Indicator -->
          @if (tab.metadata?.status) {
            <span
              class="status-dot"
              [class]="'status-' + tab.metadata.status"
              [title]="tab.metadata.status"
            ></span>
          }
        </div>
      </ng-template>

      <!-- Tab Label -->
      <ng-template #tabs let-tab="tab">
        <div class="tab-header">
          <span class="label">{{ tab.label }}</span>
          @if (tab.metadata?.status) {
            <span class="status-text">{{ tab.metadata.status }}</span>
          }
        </div>
      </ng-template>

      <!-- Content -->
      <ng-template #tabsContent let-tab="tab">
        <div class="tab-content-rich">
          <h3>{{ tab.label }}</h3>

          @if (tab.metadata?.avatar) {
            <img [src]="tab.metadata.avatar" alt="{{ tab.label }}" class="content-avatar" />
          }

          <p>{{ tab.metadata?.description }}</p>

          @if (tab.metadata?.status) {
            <div class="status-badge">
              <span class="status-badge-dot" [class]="'dot-' + tab.metadata.status"></span>
              Status: {{ tab.metadata.status }}
            </div>
          }

          @if (tab.metadata?.color) {
            <div class="color-preview">
              <div class="color-box" [style.background-color]="tab.metadata.color"></div>
              Color: {{ tab.metadata.color }}
            </div>
          }
        </div>
      </ng-template>
    </custom-tab>
  `,
  styles: [
    `
      .icon-wrapper {
        position: relative;
        display: inline-block;
      }

      .tab-avatar {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: cover;
      }

      .status-dot {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 2px solid white;
      }

      .status-active {
        background-color: #28a745;
      }

      .status-inactive {
        background-color: #6c757d;
      }

      .status-pending {
        background-color: #ffc107;
      }

      .tab-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .status-text {
        font-size: 11px;
        opacity: 0.7;
        text-transform: capitalize;
      }

      .content-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        margin: 16px 0;
      }

      .status-badge {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background-color: #f5f5f5;
        border-radius: 4px;
        margin-top: 12px;
      }

      .status-badge-dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      .dot-active {
        background-color: #28a745;
      }

      .dot-inactive {
        background-color: #6c757d;
      }

      .dot-pending {
        background-color: #ffc107;
      }

      .color-preview {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 12px;
      }

      .color-box {
        width: 40px;
        height: 40px;
        border-radius: 4px;
        border: 1px solid #ddd;
      }
    `
  ]
})
export class StatusTabsDemo {
  tabsWithStatus = signal<ExtendedTabItem[]>([
    {
      id: 1,
      label: 'Alice',
      value: 'alice',
      metadata: {
        description: 'Senior Developer',
        avatar: 'https://i.pravatar.cc/150?img=1',
        status: 'active',
        color: '#007bff'
      }
    },
    {
      id: 2,
      label: 'Bob',
      value: 'bob',
      metadata: {
        description: 'UX Designer',
        avatar: 'https://i.pravatar.cc/150?img=2',
        status: 'inactive',
        color: '#dc3545'
      }
    },
    {
      id: 3,
      label: 'Carol',
      value: 'carol',
      metadata: {
        description: 'Product Manager',
        avatar: 'https://i.pravatar.cc/150?img=3',
        status: 'pending',
        color: '#ffc107'
      }
    }
  ]);

  config: TabConfig = {
    showIcon: true,
    iconPosition: 'start',
    variant: 'boxed'
  };
}
```

---

### Example 4: Dynamic Tab Items from API

```typescript
@Component({
  selector: 'app-dynamic-tabs-demo',
  imports: [CustomTab, CommonModule],
  template: `
    <div class="tabs-container">
      <button (click)="loadTabs('users')">Load Users</button>
      <button (click)="loadTabs('projects')">Load Projects</button>
      <button (click)="loadTabs('settings')">Load Settings</button>

      @if (isLoading()) {
        <p>Loading tabs...</p>
      } @else {
        <custom-tab [tabs]="dynamicTabs()" [tabConfigs]="config">
          <!-- Dynamic Icon Based on Type -->
          <ng-template #icon let-tab="tab">
            <span class="dynamic-icon">
              @switch (tab.metadata?.type) {
                @case ('user') {
                  <i class="fa fa-user"></i>
                }
                @case ('project') {
                  <i class="fa fa-folder"></i>
                }
                @case ('setting') {
                  <i class="fa fa-cog"></i>
                }
              }
            </span>
          </ng-template>

          <!-- Tab Label -->
          <ng-template #tabs let-tab="tab">
            {{ tab.label }}
          </ng-template>

          <!-- Content -->
          <ng-template #tabsContent let-tab="tab">
            <div class="dynamic-content">
              <p>{{ tab.metadata?.description }}</p>
              <pre>{{ tab | json }}</pre>
            </div>
          </ng-template>
        </custom-tab>
      }
    </div>
  `,
  styles: [
    `
      .tabs-container {
        padding: 20px;
      }

      button {
        margin-right: 8px;
        margin-bottom: 16px;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
      }

      button:hover {
        background-color: #0056b3;
      }

      .dynamic-icon {
        font-size: 18px;
      }

      .dynamic-content {
        padding: 16px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 12px;
        border-radius: 4px;
        overflow-x: auto;
        font-size: 12px;
      }
    `
  ]
})
export class DynamicTabsDemo {
  isLoading = signal(false);
  dynamicTabs = signal<ExtendedTabItem[]>([]);

  config: TabConfig = {
    showIcon: true,
    iconPosition: 'start',
    variant: 'underline'
  };

  loadTabs(type: 'users' | 'projects' | 'settings') {
    this.isLoading.set(true);

    // Simulate API call
    setTimeout(() => {
      if (type === 'users') {
        this.dynamicTabs.set([
          {
            id: 1,
            label: 'Alice Johnson',
            value: 'alice',
            metadata: {
              type: 'user',
              description: 'Senior Developer - Active',
              avatar: 'https://i.pravatar.cc/150?img=1',
              status: 'active'
            }
          },
          {
            id: 2,
            label: 'Bob Smith',
            value: 'bob',
            metadata: {
              type: 'user',
              description: 'UX Designer - Inactive',
              avatar: 'https://i.pravatar.cc/150?img=2',
              status: 'inactive'
            }
          }
        ]);
      } else if (type === 'projects') {
        this.dynamicTabs.set([
          {
            id: 1,
            label: 'Project Alpha',
            value: 'alpha',
            metadata: {
              type: 'project',
              description: 'Main application project',
              status: 'active'
            }
          },
          {
            id: 2,
            label: 'Project Beta',
            value: 'beta',
            metadata: {
              type: 'project',
              description: 'Testing framework',
              status: 'pending'
            }
          }
        ]);
      } else {
        this.dynamicTabs.set([
          {
            id: 1,
            label: 'General',
            value: 'general',
            metadata: {
              type: 'setting',
              description: 'General application settings'
            }
          },
          {
            id: 2,
            label: 'Notifications',
            value: 'notifications',
            metadata: {
              type: 'setting',
              description: 'Manage notification preferences'
            }
          }
        ]);
      }

      this.isLoading.set(false);
    }, 500);
  }
}
```

---

## Template Patterns

### Pattern 1: Conditional Rendering Based on Tab Data

```html
<ng-template #icon let-tab="tab">
  @if (tab.metadata?.status === 'active') {
  <span class="status-badge active">Active</span>
  } @else if (tab.metadata?.status === 'pending') {
  <span class="status-badge pending">Pending</span>
  } @else {
  <span class="status-badge inactive">Inactive</span>
  }
</ng-template>
```

### Pattern 2: Computed Display Values

```typescript
// In component
getTabDisplayValue(tab: ExtendedTabItem): string {
  return `${tab.label} (${tab.metadata?.count || 0})`;
}

// In template
<ng-template #tabs let-tab="tab">
  {{ getTabDisplayValue(tab) }}
</ng-template>
```

### Pattern 3: Style Binding Based on Tab Data

```html
<ng-template #tabs let-tab="tab">
  <span
    class="tab-label"
    [style.color]="tab.metadata?.color"
    [style.font-weight]="tab.metadata?.status === 'active' ? 'bold' : 'normal'"
  >
    {{ tab.label }}
  </span>
</ng-template>
```

### Pattern 4: Multi-Level Data Access

```html
<ng-template #tabs let-tab="tab">
  <div class="multi-level">
    <span>{{ tab.label }}</span>
    @if (tab.icon?.start) {
    <small>Has icon</small>
    } @if (tab.metadata?.description) {
    <small>{{ tab.metadata.description }}</small>
    }
  </div>
</ng-template>
```

---

## Real-World Scenarios

### Scenario 1: User Team Tabs

```typescript
interface TeamMember extends ExtendedTabItem {
  metadata: {
    avatar: string;
    role: string;
    status: 'online' | 'offline' | 'away';
    lastSeen?: Date;
  };
}
```

### Scenario 2: Project Status Tabs

```typescript
interface ProjectTab extends ExtendedTabItem {
  metadata: {
    description: string;
    progress: number;
    dueDate: Date;
    team: string[];
    status: 'on-track' | 'at-risk' | 'completed';
  };
}
```

### Scenario 3: Analytics Dashboard Tabs

```typescript
interface AnalyticsTab extends ExtendedTabItem {
  metadata: {
    icon: string;
    color: string;
    value: number;
    trend: 'up' | 'down' | 'stable';
    trendPercent: number;
  };
}
```

---

## Best Practices

✅ **Keep tab data flat** - Use `metadata` object for additional properties
✅ **Use computed properties** - Calculate display values in component
✅ **Type safety** - Extend TabItem interface for custom properties
✅ **Template reusability** - Create generic templates that work with various data
✅ **Performance** - Use `signal()` for reactive updates

---

## Summary

Tab items as templates provide:

- **Flexibility**: Customize appearance based on data
- **Reusability**: Single template works with different data
- **Type Safety**: Extended interfaces ensure correct data structure
- **Scalability**: Easy to add new properties without changing templates

Master this pattern for professional, data-driven UI components! 🚀
