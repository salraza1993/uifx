# Dual Icons Implementation Guide

Supporting both start and end icons simultaneously for advanced tab designs.

---

## Overview

The updated `custom-tab` component now supports three icon position modes:

| Mode      | Behavior                      | Use Case                        |
| --------- | ----------------------------- | ------------------------------- |
| `'start'` | Icon appears before the label | Category icons, type indicators |
| `'end'`   | Icon appears after the label  | Status badges, notifications    |
| `'both'`  | Icons appear before AND after | Rich visual context (NEW)       |

---

## Implementation

### Updated Configuration

```typescript
// TabConfig now supports 'both'
export interface TabConfig {
  showIcon?: boolean;
  iconPosition?: 'start' | 'end' | 'both'; // ✨ NEW: 'both' option
  // ... other properties
}
```

---

## Usage Examples

### Example 1: Dual Array-Based Icons

Show the same icon class in both positions:

```typescript
@Component({
  selector: 'app-dual-icon-demo',
  imports: [CustomTab],
  template: ` <custom-tab [tabs]="tabs" [tabConfigs]="config" /> `
})
export class DualIconDemo {
  tabs = [
    {
      id: 1,
      label: 'Home',
      value: 'home',
      icon: 'fa fa-home' // Appears on both sides
    },
    {
      id: 2,
      label: 'Settings',
      value: 'settings',
      icon: 'fa fa-cog' // Appears on both sides
    }
  ];

  config: TabConfig = {
    showIcon: true,
    iconPosition: 'both', // ✨ New mode
    variant: 'boxed'
  };
}
```

**Result:**

```
┌─────────────────────────────┐
│ 🏠 Home 🏠   ⚙️ Settings ⚙️ │
└─────────────────────────────┘
```

---

### Example 2: Dual Template-Based Icons (Advanced)

Use templates for complete control over icon rendering:

```typescript
@Component({
  selector: 'app-advanced-dual-icons',
  imports: [CustomTab],
  template: `
    <custom-tab [tabs]="tabs" [tabConfigs]="config">
      <ng-template #icon let-tab="tab">
        <!-- Left side: Category icon -->
        <span class="category-icon">
          @switch (tab.category) {
            @case ('communication') {
              📧
            }
            @case ('media') {
              🎬
            }
            @case ('settings') {
              ⚙️
            }
          }
        </span>

        <!-- Right side: Status indicator -->
        <span class="status-badge" [class]="'status-' + tab.status">
          {{ getStatusEmoji(tab.status) }}
        </span>
      </ng-template>
    </custom-tab>
  `,
  styles: [
    `
      :host ::ng-deep .icon-start {
        order: -1; /* Appears on left */
      }

      :host ::ng-deep .icon-end {
        order: 1; /* Appears on right */
      }

      .category-icon {
        font-size: 18px;
        margin-right: 4px;
      }

      .status-badge {
        font-size: 14px;
        margin-left: 4px;
        font-weight: bold;
      }
    `
  ]
})
export class AdvancedDualIcons {
  tabs = [
    {
      id: 1,
      label: 'Messages',
      value: 'messages',
      category: 'communication',
      status: 'active'
    },
    {
      id: 2,
      label: 'Media',
      value: 'media',
      category: 'media',
      status: 'inactive'
    },
    {
      id: 3,
      label: 'Settings',
      value: 'settings',
      category: 'settings',
      status: 'pending'
    }
  ];

  config: TabConfig = {
    showIcon: true,
    iconPosition: 'both',
    variant: 'pill'
  };

  getStatusEmoji(status: string): string {
    const emojis: { [key: string]: string } = {
      active: '✅',
      inactive: '⏸️',
      pending: '⏳'
    };
    return emojis[status] || '❓';
  }
}
```

**Result:**

```
┌───────────────────────────────────────────────────┐
│ 📧 Messages ✅   🎬 Media ⏸️   ⚙️ Settings ⏳    │
└───────────────────────────────────────────────────┘
```

---

### Example 3: Mixed Icons (Array + Template)

Combine array-based and template-based icons for flexibility:

```typescript
@Component({
  selector: 'app-mixed-icons',
  imports: [CustomTab],
  template: `
    <custom-tab [tabs]="tabs" [tabConfigs]="config">
      <ng-template #icon let-tab="tab">
        <!-- Custom template for right side -->
        @if (tab.badge) {
          <span class="notification-badge">
            {{ tab.badge }}
          </span>
        }
      </ng-template>
    </custom-tab>
  `,
  styles: [
    `
      .notification-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #ff4444;
        color: white;
        font-size: 12px;
        font-weight: bold;
      }
    `
  ]
})
export class MixedIcons {
  tabs = [
    {
      id: 1,
      label: 'Inbox',
      value: 'inbox',
      icon: 'fa fa-inbox', // Left side: array-based
      badge: 5 // Right side: template-based
    },
    {
      id: 2,
      label: 'Sent',
      value: 'sent',
      icon: 'fa fa-paper-plane',
      badge: null
    },
    {
      id: 3,
      label: 'Drafts',
      value: 'drafts',
      icon: 'fa fa-file-text',
      badge: 2
    }
  ];

  config: TabConfig = {
    showIcon: true,
    iconPosition: 'both',
    variant: 'underline'
  };
}
```

**Result:**

```
┌──────────────────────────────────────────┐
│ 📧 Inbox [5]   ✈️ Sent   📄 Drafts [2]  │
└──────────────────────────────────────────┘
```

---

### Example 4: SVG Icons on Both Sides

Professional SVG-based dual icons:

```typescript
@Component({
  selector: 'app-svg-dual-icons',
  imports: [CustomTab],
  template: `
    <custom-tab [tabs]="tabs" [tabConfigs]="config">
      <ng-template #icon let-tab="tab">
        <div class="dual-icon-container">
          <!-- Start icon: Main feature -->
          <svg class="icon-start-svg" [attr.data-icon]="tab.mainIcon">
            <use [attr.xlink:href]="'#' + tab.mainIcon"></use>
          </svg>

          <!-- End icon: Status indicator -->
          <svg class="icon-end-svg" [attr.data-status]="tab.statusIcon">
            <use [attr.xlink:href]="'#' + tab.statusIcon"></use>
          </svg>
        </div>
      </ng-template>
    </custom-tab>
  `,
  styles: [
    `
      .dual-icon-container {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        justify-content: space-between;
      }

      .icon-start-svg {
        width: 20px;
        height: 20px;
        fill: currentColor;
        flex-shrink: 0;
      }

      .icon-end-svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
        flex-shrink: 0;
      }
    `
  ]
})
export class SvgDualIcons {
  tabs = [
    {
      id: 1,
      label: 'Dashboard',
      value: 'dashboard',
      mainIcon: 'icon-dashboard',
      statusIcon: 'icon-check'
    },
    {
      id: 2,
      label: 'Analytics',
      value: 'analytics',
      mainIcon: 'icon-chart',
      statusIcon: 'icon-loading'
    },
    {
      id: 3,
      label: 'Reports',
      value: 'reports',
      mainIcon: 'icon-report',
      statusIcon: 'icon-warning'
    }
  ];

  config: TabConfig = {
    showIcon: true,
    iconPosition: 'both',
    variant: 'boxed'
  };
}
```

---

## CSS Styling Tips

### Adjust Icon Spacing

```css
/* In your component styles */

/* Control spacing around icons */
:host ::ng-deep .icon-start {
  margin-right: 8px;
}

:host ::ng-deep .icon-end {
  margin-left: 8px;
}

/* Or use flexbox gap */
:host ::ng-deep .tablist__item {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

### Style Icons Based on Tab State

```css
/* Highlight icons when tab is active */
:host ::ng-deep .tablist__item.active .icon {
  opacity: 1;
  transform: scale(1.1);
}

:host ::ng-deep .tablist__item:not(.active) .icon {
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

/* Different styling for start vs end */
:host ::ng-deep .icon-start {
  color: #007bff;
}

:host ::ng-deep .icon-end {
  color: #28a745;
}
```

---

## Advanced Patterns

### Pattern 1: Icon Animation on Hover

```typescript
@Component({
  template: `
    <custom-tab [tabs]="tabs" [tabConfigs]="config">
      <ng-template #icon let-tab="tab">
        <svg class="animated-icon-start" [@spin]="animationState">
          <!-- Start icon -->
        </svg>
        <svg class="animated-icon-end" [@pulse]="animationState">
          <!-- End icon -->
        </svg>
      </ng-template>
    </custom-tab>
  `
})
export class AnimatedDualIcons {
  animationState = 'idle';
}
```

### Pattern 2: Dynamic Icon Visibility

```typescript
@Component({
  template: `
    <custom-tab [tabs]="tabsWithDynamicIcons()" [tabConfigs]="config">
      <ng-template #icon let-tab="tab">
        <!-- Show different icons based on state -->
        @switch (tab.state) {
          @case ('loading') {
            <span class="spinner"></span>
          }
          @case ('success') {
            <span class="icon-success">✅</span>
          }
          @case ('error') {
            <span class="icon-error">❌</span>
          }
        }
      </ng-template>
    </custom-tab>
  `
})
export class DynamicDualIcons {
  tabsWithDynamicIcons = computed(() =>
    this.baseTabs().map(tab => ({
      ...tab,
      state: this.getTabState(tab.id)
    }))
  );

  getTabState(tabId: number): 'loading' | 'success' | 'error' {
    // Return state based on data
  }
}
```

---

## Key Features

✅ **Backward Compatible** - Existing `'start'` and `'end'` still work
✅ **Flexible Rendering** - Use templates or CSS classes
✅ **Mixed Approach** - Combine array-based and template-based icons
✅ **Full Control** - Style and animate each icon independently
✅ **Responsive** - Icons adapt to different screen sizes

---

## Migration from Single to Dual Icons

**Before (Single Icon):**

```typescript
config: TabConfig = {
  showIcon: true,
  iconPosition: 'start'
};
```

**After (Dual Icons):**

```typescript
config: TabConfig = {
  showIcon: true,
  iconPosition: 'both' // Just change this!
};
```

Your existing icon data will automatically appear on both sides! 🎉

---

## Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge)

- CSS Flexbox for layout
- SVG for advanced icons
- Template syntax via Angular 15+

---

## Performance Considerations

- **Rendering**: Both icons render once (not duplicated)
- **Detected Changes**: OnPush change detection still applies
- **Memory**: Minimal overhead compared to single icons
- **Animation**: Use CSS animations for better performance than JavaScript

---

## Troubleshooting

### Icons not showing in both positions?

```typescript
// Make sure iconPosition is set to 'both'
config.iconPosition = 'both';

// And showIcon is true
config.showIcon = true;
```

### Icons overlapping?

```css
/* Adjust spacing in your component styles */
:host ::ng-deep .tablist__item {
  gap: 12px; /* Increase gap */
}
```

### Template-based icons not rendering?

```html
<!-- Ensure you have contentChild for icon template -->
<ng-template #icon let-tab="tab">
  <!-- Your icon content -->
</ng-template>
```

---

## Complete Real-World Example

See [real-world-dual-icons.ts](#) for a complete email client tabs implementation using dual icons!
