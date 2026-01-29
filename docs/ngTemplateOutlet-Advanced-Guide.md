# Advanced ngTemplateOutlet Guide

A comprehensive guide to implementing dynamic components and icon templates in Angular using `ngTemplateOutlet`.

---

## Table of Contents

1. [Implementation Guide](#implementation-guide)
2. [Icon Implementation](#icon-implementation)
3. [Advanced Use Cases](#advanced-use-cases)
4. [Best Practices](#best-practices)

---

## Implementation Guide

### Current Implementation Analysis

Your `custom-tab` component already supports **both approaches**:

1. **Array-based icons**: `tab.icon` (CSS class string like `'fa fa-home'`)
2. **Template-based icons**: `iconTemplate()` via `ng-template`

### Icon Implementation

#### Approach A: Array-Based Icons

```typescript
// Parent component
tabs = [
  { id: 1, label: 'Home', value: 'home', icon: 'fa fa-home' },
  { id: 2, label: 'Profile', value: 'profile', icon: 'fa fa-user' },
  { id: 3, label: 'Settings', value: 'settings', icon: 'fa fa-cog' }
];
```

**Advantages:**

- Simple, lightweight
- Perfect for Font Awesome or similar icon libraries
- No additional template complexity

**Disadvantages:**

- Limited to string-based icon classes
- No dynamic SVG or complex icon rendering
- Hard to customize per-tab appearance

---

#### Approach B: Template-Based Icons (Advanced)

```html
<!-- Parent component template -->
<custom-tab [tabs]="tabs" [tabConfigs]="config">
  <!-- Icon template for custom rendering -->
  <ng-template #icon let-tab="tab">
    <!-- Option 1: SVG Icons -->
    <svg class="icon-svg" [attr.data-icon]="tab.iconName" width="24" height="24">
      <use [attr.xlink:href]="'#icon-' + tab.iconName"></use>
    </svg>
  </ng-template>

  <!-- Option 2: Dynamic Component Icons -->
  <ng-template #icon let-tab="tab">
    <app-dynamic-icon [type]="tab.iconType" [color]="tab.iconColor" />
  </ng-template>

  <!-- Option 3: Conditional Icon Rendering -->
  <ng-template #icon let-tab="tab">
    @switch (tab.iconType) { @case ('image') {
    <img [src]="tab.iconSrc" [alt]="tab.label" class="tab-icon-img" />
    } @case ('svg') {
    <svg class="tab-icon-svg">
      <circle cx="12" cy="12" r="10" />
    </svg>
    } @case ('emoji') {
    <span class="tab-icon-emoji">{{ tab.iconEmoji }}</span>
    } }
  </ng-template>

  <!-- Tab label template -->
  <ng-template #tabs let-tab="tab">
    <span class="tab-label">{{ tab.label }}</span>
  </ng-template>

  <!-- Content template -->
  <ng-template #tabsContent let-tab="tab">
    <div class="tab-content">{{ tab.label }} content here</div>
  </ng-template>
</custom-tab>
```

**Parent Component TypeScript:**

```typescript
import { Component, signal } from '@angular/core';
import { CustomTab } from './custom-tab/custom-tab';
import { TabItem, TabConfig } from './custom-tab/custom-tab-model';

@Component({
  selector: 'app-tab-demo',
  imports: [CustomTab],
  template: `<!-- HTML above -->`
})
export class TabDemo {
  // Option A: Simple icon classes
  simpleIconTabs = signal<TabItem[]>([
    { id: 1, label: 'Home', value: 'home', icon: 'fa fa-home' },
    { id: 2, label: 'Profile', value: 'profile', icon: 'fa fa-user' }
  ]);

  // Option B: Extended icon data
  advancedIconTabs = signal<TabItem[]>([
    {
      id: 1,
      label: 'Home',
      value: 'home',
      iconName: 'home',
      iconType: 'svg',
      iconColor: '#007bff'
    },
    {
      id: 2,
      label: 'Gallery',
      value: 'gallery',
      iconSrc: 'assets/gallery.png',
      iconType: 'image'
    },
    {
      id: 3,
      label: 'Happy',
      value: 'happy',
      iconEmoji: '😊',
      iconType: 'emoji'
    }
  ]);

  config: TabConfig = {
    variant: 'boxed',
    showIcon: true,
    iconPosition: 'start',
    orientation: 'horizontal'
  };
}
```

**Advantages:**

- Flexible icon rendering
- Support for SVG, images, emojis
- Full customization per tab
- Scalable for complex designs

---

## Advanced Use Cases

### Use Case 1: Dynamic Table Component

A table that accepts custom cell templates for flexible data rendering.

**Component TypeScript:**

```typescript
import {
  Component,
  input,
  signal,
  TemplateRef,
  computed,
  viewChild,
  contentChild
} from '@angular/core';
import { NgTemplateOutlet, NgForOf } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  template?: TemplateRef<any>;
}

@Component({
  selector: 'dynamic-table',
  imports: [NgTemplateOutlet, NgForOf],
  template: `
    <div class="table-wrapper">
      <table class="dynamic-table">
        <thead>
          <tr class="table-header">
            @for (column of columns(); track column.key) {
              <th
                class="table-cell-header"
                [style.width]="column.width || 'auto'"
                [class.sortable]="column.sortable"
              >
                {{ column.label }}
              </th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of data(); track row.id) {
            <tr class="table-row" [class.selected]="isRowSelected(row)">
              @for (column of columns(); track column.key) {
                <td class="table-cell" [style.width]="column.width || 'auto'">
                  @if (column.template; as cellTemplate) {
                    <ng-container
                      *ngTemplateOutlet="
                        cellTemplate; 
                        context: { 
                          $implicit: row[column.key],
                          row: row,
                          column: column,
                          index: $index,
                          select: () => selectRow(row)
                        }
                      "
                    ></ng-container>
                  } @else {
                    {{ row[column.key] }}
                  }
                </td>
              }
            </tr>
          }
          @if (!data().length) {
            <tr class="table-empty">
              <td [attr.colspan]="columns().length" class="empty-message">No data available</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class DynamicTable {
  columns = input.required<TableColumn[]>();
  data = input.required<any[]>();

  selectedRows = signal<Set<any>>(new Set());

  isRowSelected(row: any) {
    return this.selectedRows().has(row);
  }

  selectRow(row: any) {
    this.selectedRows.update(set => {
      const newSet = new Set(set);
      newSet.has(row) ? newSet.delete(row) : newSet.add(row);
      return newSet;
    });
  }
}
```

**Parent Component Usage:**

```typescript
@Component({
  selector: 'app-user-table',
  imports: [DynamicTable],
  template: `
    <dynamic-table [columns]="tableColumns" [data]="users">
      <ng-template #statusCell let-value let-row="row" let-select="select">
        <span class="badge" [class]="'badge-' + value.toLowerCase()" (click)="select()">
          {{ value }}
        </span>
      </ng-template>

      <ng-template #actionCell let-row="row">
        <div class="action-buttons">
          <button (click)="editUser(row)" class="btn-sm">Edit</button>
          <button (click)="deleteUser(row)" class="btn-sm btn-danger">Delete</button>
        </div>
      </ng-template>
    </dynamic-table>
  `
})
export class UserTable {
  users = signal([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
  ]);

  statusTemplate = contentChild<TemplateRef<any>>('statusCell');
  actionTemplate = contentChild<TemplateRef<any>>('actionCell');

  tableColumns = computed(() => [
    { key: 'name', label: 'Name', width: '200px' },
    { key: 'email', label: 'Email', width: '250px' },
    {
      key: 'status',
      label: 'Status',
      template: this.statusTemplate()
    },
    {
      key: 'actions',
      label: 'Actions',
      template: this.actionTemplate()
    }
  ]);

  editUser(user: any) {
    console.log('Edit:', user);
  }

  deleteUser(user: any) {
    console.log('Delete:', user);
  }
}
```

---

### Use Case 2: Recursive Tree Component

Perfect for file explorers, org charts, and nested navigation.

**Component TypeScript:**

```typescript
import { Component, input, model, signal, TemplateRef, computed } from '@angular/core';
import { NgTemplateOutlet, NgForOf, NgIf } from '@angular/common';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  [key: string]: any;
}

@Component({
  selector: 'tree-view',
  imports: [NgTemplateOutlet, NgForOf, NgIf],
  template: `
    <ul class="tree" [style.padding-left.px]="level() * 20">
      @for (node of nodes(); track node.id) {
        <li class="tree-node">
          <div class="node-header">
            @if (node.children?.length) {
              <button
                class="expand-btn"
                [class.expanded]="expandedNodes().has(node.id)"
                (click)="toggleNode(node.id)"
                [attr.aria-expanded]="expandedNodes().has(node.id)"
              >
                <span class="expand-icon">
                  {{ expandedNodes().has(node.id) ? '▼' : '▶' }}
                </span>
              </button>
            } @else {
              <span class="expand-placeholder"></span>
            }

            <div class="node-content">
              @if (nodeTemplate(); as template) {
                <ng-container
                  *ngTemplateOutlet="
                    template;
                    context: { 
                      $implicit: node,
                      node: node,
                      level: level(),
                      expanded: expandedNodes().has(node.id),
                      toggle: () => toggleNode(node.id),
                      isLeaf: !node.children?.length
                    }
                  "
                ></ng-container>
              } @else {
                <span class="node-label">{{ node.label }}</span>
              }
            </div>
          </div>

          @if (node.children?.length && expandedNodes().has(node.id)) {
            <tree-view
              [nodes]="node.children"
              [level]="level() + 1"
              [nodeTemplate]="nodeTemplate()"
              [expandedNodes]="expandedNodes"
            />
          }
        </li>
      }
    </ul>
  `,
  styles: [
    `
      .tree {
        list-style: none;
        padding-left: 0;
      }

      .tree-node {
        margin: 4px 0;
      }

      .node-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .expand-btn {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .expand-placeholder {
        width: 24px;
      }
    `
  ]
})
export class TreeView {
  nodes = input.required<TreeNode[]>();
  level = input(0);
  nodeTemplate = input<TemplateRef<any>>();
  expandedNodes = model<Set<string>>(new Set());

  toggleNode(id: string) {
    this.expandedNodes.update(set => {
      const newSet = new Set(set);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  }
}
```

**Parent Component Usage:**

```typescript
@Component({
  selector: 'app-file-explorer',
  imports: [TreeView],
  template: `
    <div class="file-explorer">
      <h2>File Explorer</h2>
      <tree-view
        [nodes]="fileSystem"
        [nodeTemplate]="nodeTemplate"
        [expandedNodes]="expandedFolders"
      />
    </div>

    <ng-template #nodeTemplate let-node let-level="level" let-toggle="toggle" let-isLeaf="isLeaf">
      <div class="file-item" [style.padding-left.px]="level * 10">
        @if (!isLeaf) {
          <span class="folder-icon">📁</span>
          <span class="folder-name" (click)="toggle()">{{ node.label }}</span>
          <span class="folder-size">{{ node.size }}</span>
        } @else {
          <span class="file-icon">{{ getFileIcon(node.label) }}</span>
          <span class="file-name">{{ node.label }}</span>
          <span class="file-size">{{ node.size }}</span>
        }
      </div>
    </ng-template>
  `,
  styles: [
    `
      .file-explorer {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 16px;
        background: #f9f9f9;
      }

      .file-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 0;
        user-select: none;
      }

      .folder-name,
      .file-name {
        cursor: pointer;
        flex: 1;
      }

      .folder-size,
      .file-size {
        color: #666;
        font-size: 12px;
        min-width: 80px;
        text-align: right;
      }
    `
  ]
})
export class FileExplorer {
  expandedFolders = signal(new Set(['docs', 'src']));

  nodeTemplate = signal<TemplateRef<any> | null>(null);

  fileSystem: TreeNode[] = [
    {
      id: 'docs',
      label: 'Documents',
      size: '245 MB',
      children: [
        { id: 'doc1', label: 'Resume.pdf', size: '2.5 MB' },
        { id: 'doc2', label: 'Portfolio.pdf', size: '5.2 MB' }
      ]
    },
    {
      id: 'src',
      label: 'Source Code',
      size: '150 MB',
      children: [
        { id: 'src-app', label: 'app', size: '50 MB' },
        { id: 'src-config', label: 'config', size: '100 MB' }
      ]
    }
  ];

  getFileIcon(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    const icons: { [key: string]: string } = {
      pdf: '📄',
      doc: '📝',
      txt: '📋',
      jpg: '🖼️',
      png: '🖼️',
      zip: '📦',
      json: '⚙️',
      ts: '⚙️',
      js: '⚙️'
    };
    return icons[ext || ''] || '📄';
  }
}
```

---

### Use Case 3: Multi-Layout Card System

Flexible card layouts that change based on configuration.

**Component TypeScript:**

```typescript
import { Component, input, TemplateRef, contentChild, computed } from '@angular/core';
import { NgTemplateOutlet, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';

export type CardLayout = 'vertical' | 'horizontal' | 'grid' | 'stacked';

@Component({
  selector: 'dynamic-card',
  imports: [NgTemplateOutlet, NgIf, NgSwitch, NgSwitchCase],
  template: `
    <div class="card" [class]="'card--' + layout()" [style]="cardStyles()">
      @switch (layout()) {
        @case ('vertical') {
          <div class="card-vertical">
            <ng-container *ngTemplateOutlet="headerTpl"></ng-container>
            <ng-container *ngTemplateOutlet="imageTpl"></ng-container>
            <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
            <ng-container *ngTemplateOutlet="footerTpl"></ng-container>
          </div>
        }
        @case ('horizontal') {
          <div class="card-horizontal">
            <div class="card-left">
              <ng-container *ngTemplateOutlet="imageTpl"></ng-container>
            </div>
            <div class="card-right">
              <ng-container *ngTemplateOutlet="headerTpl"></ng-container>
              <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
              <ng-container *ngTemplateOutlet="footerTpl"></ng-container>
            </div>
          </div>
        }
        @case ('grid') {
          <div class="card-grid">
            <ng-container *ngTemplateOutlet="headerTpl"></ng-container>
            <ng-container *ngTemplateOutlet="imageTpl"></ng-container>
            <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
            <ng-container *ngTemplateOutlet="footerTpl"></ng-container>
          </div>
        }
        @case ('stacked') {
          <div class="card-stacked">
            <ng-container *ngTemplateOutlet="imageTpl"></ng-container>
            <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
            <ng-container *ngTemplateOutlet="headerTpl"></ng-container>
            <ng-container *ngTemplateOutlet="footerTpl"></ng-container>
          </div>
        }
      }
    </div>

    <ng-template #headerTpl>
      @if (headerTemplate(); as tpl) {
        <ng-container *ngTemplateOutlet="tpl; context: cardContext()"></ng-container>
      }
    </ng-template>

    <ng-template #imageTpl>
      @if (imageTemplate(); as tpl) {
        <ng-container *ngTemplateOutlet="tpl; context: cardContext()"></ng-container>
      }
    </ng-template>

    <ng-template #contentTpl>
      @if (contentTemplate(); as tpl) {
        <ng-container *ngTemplateOutlet="tpl; context: cardContext()"></ng-container>
      } @else {
        <div class="card-default-content">{{ data()?.content }}</div>
      }
    </ng-template>

    <ng-template #footerTpl>
      @if (footerTemplate(); as tpl) {
        <ng-container *ngTemplateOutlet="tpl; context: cardContext()"></ng-container>
      }
    </ng-template>
  `,
  styles: [
    `
      .card {
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: box-shadow 0.3s ease;
      }

      .card:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }

      .card-vertical {
        display: flex;
        flex-direction: column;
      }

      .card-horizontal {
        display: flex;
        flex-direction: row;
      }

      .card-left {
        flex: 0 0 40%;
      }

      .card-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 16px;
      }

      .card-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        padding: 16px;
      }

      .card-stacked {
        display: flex;
        flex-direction: column-reverse;
      }
    `
  ]
})
export class DynamicCard {
  layout = input<CardLayout>('vertical');
  data = input<any>();
  maxWidth = input<string>();

  headerTemplate = contentChild<TemplateRef<any>>('header');
  contentTemplate = contentChild<TemplateRef<any>>('content');
  footerTemplate = contentChild<TemplateRef<any>>('footer');
  imageTemplate = contentChild<TemplateRef<any>>('image');

  cardContext = computed(() => ({
    $implicit: this.data(),
    data: this.data(),
    layout: this.layout()
  }));

  cardStyles = computed(() => ({
    'max-width': this.maxWidth() || 'auto'
  }));
}
```

**Parent Component Usage:**

```typescript
@Component({
  selector: 'app-card-showcase',
  imports: [DynamicCard, CommonModule],
  template: `
    <div class="card-grid">
      <!-- Vertical Layout Card -->
      <dynamic-card [layout]="'vertical'" [data]="productData" [maxWidth]="'300px'">
        <ng-template #image let-data>
          <img [src]="data.image" alt="Product" class="card-image" />
        </ng-template>

        <ng-template #header let-data>
          <div class="card-header">
            <h3>{{ data.title }}</h3>
            <span class="badge">{{ data.category }}</span>
          </div>
        </ng-template>

        <ng-template #content let-data>
          <p>{{ data.description }}</p>
          <div class="rating">⭐ {{ data.rating }}/5</div>
        </ng-template>

        <ng-template #footer let-data>
          <div class="card-footer">
            <span class="price">${{ data.price }}</span>
            <button class="btn-primary">Add to Cart</button>
          </div>
        </ng-template>
      </dynamic-card>

      <!-- Horizontal Layout Card -->
      <dynamic-card [layout]="'horizontal'" [data]="profileData" [maxWidth]="'500px'">
        <ng-template #image let-data>
          <img [src]="data.avatar" alt="Profile" class="profile-avatar" />
        </ng-template>

        <ng-template #header let-data>
          <h3>{{ data.name }}</h3>
          <p class="subtitle">{{ data.title }}</p>
        </ng-template>

        <ng-template #content let-data>
          <p>{{ data.bio }}</p>
          <div class="stats">
            <div class="stat">
              <span class="stat-label">Projects</span>
              <span class="stat-value">{{ data.projects }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Followers</span>
              <span class="stat-value">{{ data.followers }}</span>
            </div>
          </div>
        </ng-template>
      </dynamic-card>
    </div>
  `
})
export class CardShowcase {
  productData = {
    image: 'assets/product.jpg',
    title: 'Premium Headphones',
    category: 'Electronics',
    description: 'High-quality audio with noise cancellation',
    rating: 4.5,
    price: 199.99
  };

  profileData = {
    avatar: 'assets/profile.jpg',
    name: 'Jane Developer',
    title: 'Full Stack Engineer',
    bio: 'Passionate about Angular and modern web development',
    projects: 24,
    followers: 1200
  };
}
```

---

### Use Case 4: Polymorphic List View with Multiple Slots

A flexible list that supports multiple content slots and states.

**Component TypeScript:**

```typescript
import { Component, input, model, signal, TemplateRef, contentChild } from '@angular/core';
import { NgTemplateOutlet, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'list-view',
  imports: [NgTemplateOutlet, NgForOf, NgIf],
  template: `
    <div class="list-container" [class.loading]="loading()">
      @if (loading() && loadingTemplate(); as tpl) {
        <div class="list-loading">
          <ng-container *ngTemplateOutlet="tpl"></ng-container>
        </div>
      }

      @if (!loading()) {
        @if (items().length) {
          <ul class="list">
            @for (item of items(); track trackByFn($index, item)) {
              <li
                class="list-item"
                [class.selected]="selectedItems().has(getId(item))"
                (click)="toggleSelection(item)"
              >
                <!-- Before slot -->
                @if (beforeTemplate(); as tpl) {
                  <div class="list-item-before">
                    <ng-container
                      *ngTemplateOutlet="tpl; context: createContext(item, $index, 'before')"
                    ></ng-container>
                  </div>
                }

                <!-- Main content -->
                <div class="list-item-content">
                  @if (itemTemplate(); as tpl) {
                    <ng-container
                      *ngTemplateOutlet="tpl; context: createContext(item, $index, 'main')"
                    ></ng-container>
                  } @else {
                    <div class="default-item">{{ item }}</div>
                  }
                </div>

                <!-- After slot -->
                @if (afterTemplate(); as tpl) {
                  <div class="list-item-after">
                    <ng-container
                      *ngTemplateOutlet="tpl; context: createContext(item, $index, 'after')"
                    ></ng-container>
                  </div>
                }

                <!-- Item loading state -->
                @if (itemLoadingState().has(getId(item)) && itemLoadingTemplate(); as tpl) {
                  <div class="item-loading-overlay">
                    <ng-container *ngTemplateOutlet="tpl"></ng-container>
                  </div>
                }
              </li>
            }
          </ul>
        } @else {
          @if (emptyTemplate(); as tpl) {
            <ng-container *ngTemplateOutlet="tpl"></ng-container>
          } @else {
            <div class="list-empty">No items found</div>
          }
        }
      }
    </div>
  `,
  styles: [
    `
      .list-container {
        display: flex;
        flex-direction: column;
      }

      .list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .list-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      .list-item:hover {
        background-color: #f5f5f5;
      }

      .list-item.selected {
        background-color: #e3f2fd;
      }

      .list-item-content {
        flex: 1;
      }

      .list-empty,
      .list-loading {
        padding: 32px;
        text-align: center;
        color: #666;
      }
    `
  ]
})
export class ListView<T> {
  items = input.required<T[]>();
  loading = input(false);
  selectedItems = model<Set<any>>(new Set());

  itemLoadingState = signal<Set<any>>(new Set());

  // Templates
  itemTemplate = contentChild<TemplateRef<any>>('item');
  beforeTemplate = contentChild<TemplateRef<any>>('before');
  afterTemplate = contentChild<TemplateRef<any>>('after');
  emptyTemplate = contentChild<TemplateRef<any>>('empty');
  loadingTemplate = contentChild<TemplateRef<any>>('loading');

  // Customization functions
  trackByFn = input<(index: number, item: T) => any>((i, item) => item);
  getId = input<(item: T) => any>(item => item);

  createContext(item: T, index: number, slot: string) {
    const id = this.getId()(item);
    return {
      $implicit: item,
      item,
      index,
      slot,
      selected: this.selectedItems().has(id),
      toggleSelect: () => this.toggleSelection(item),
      setLoading: (loading: boolean) => this.setItemLoading(item, loading)
    };
  }

  toggleSelection(item: T) {
    const id = this.getId()(item);
    this.selectedItems.update(set => {
      const newSet = new Set(set);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  }

  setItemLoading(item: T, loading: boolean) {
    const id = this.getId()(item);
    this.itemLoadingState.update(set => {
      const newSet = new Set(set);
      loading ? newSet.add(id) : newSet.delete(id);
      return newSet;
    });
  }
}
```

**Parent Component Usage:**

```typescript
@Component({
  selector: 'app-email-list',
  imports: [ListView, CommonModule],
  template: `
    <div class="email-client">
      <h2>Inbox</h2>
      <list-view
        [items]="emails"
        [loading]="isLoading()"
        [selectedItems]="selectedEmails"
        [getId]="(item) => item.id"
      >
        <!-- Loading template -->
        <ng-template #loading>
          <div class="spinner">Loading emails...</div>
        </ng-template>

        <!-- Item template -->
        <ng-template #item let-email let-toggleSelect="toggleSelect" let-index="index">
          <div class="email-item">
            <h4>{{ email.from }}</h4>
            <p class="email-subject">{{ email.subject }}</p>
            <p class="email-preview">{{ email.preview }}</p>
            <span class="email-date">{{ email.date | date: 'short' }}</span>
          </div>
        </ng-template>

        <!-- Checkbox before -->
        <ng-template #before let-email let-selected="selected" let-toggleSelect="toggleSelect">
          <input
            type="checkbox"
            [checked]="selected"
            (change)="toggleSelect()"
            class="email-checkbox"
          />
        </ng-template>

        <!-- Actions after -->
        <ng-template #after let-email let-setLoading="setLoading">
          <div class="email-actions">
            <button
              (click)="markAsRead(email); setLoading(true)"
              class="btn-icon"
              title="Mark as read"
            >
              📧
            </button>
            <button (click)="deleteEmail(email); setLoading(true)" class="btn-icon" title="Delete">
              🗑️
            </button>
          </div>
        </ng-template>

        <!-- Empty state -->
        <ng-template #empty>
          <div class="empty-inbox">
            <div class="empty-icon">📭</div>
            <p>Your inbox is empty</p>
          </div>
        </ng-template>
      </list-view>
    </div>
  `,
  styles: [
    `
      .email-item {
        padding: 12px 0;
      }

      .email-item h4 {
        margin: 0 0 4px 0;
        color: #333;
      }

      .email-subject {
        margin: 4px 0;
        font-weight: 500;
        color: #555;
      }

      .email-preview {
        margin: 4px 0;
        color: #999;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .email-date {
        color: #999;
        font-size: 12px;
      }

      .email-actions {
        display: flex;
        gap: 8px;
      }
    `
  ]
})
export class EmailList {
  isLoading = signal(false);
  selectedEmails = signal(new Set());

  emails = signal([
    {
      id: 1,
      from: 'John Doe',
      subject: 'Angular Best Practices',
      preview: "Let's discuss the latest Angular patterns...",
      date: new Date(2024, 0, 28)
    },
    {
      id: 2,
      from: 'Jane Smith',
      subject: 'Project Update',
      preview: 'The new features are ready for review...',
      date: new Date(2024, 0, 27)
    }
  ]);

  markAsRead(email: any) {
    setTimeout(() => {
      console.log('Marked as read:', email);
    }, 800);
  }

  deleteEmail(email: any) {
    setTimeout(() => {
      this.emails.update(emails => emails.filter(e => e.id !== email.id));
    }, 800);
  }
}
```

---

## Best Practices

### Context Object Guidelines

**Rich Context Pattern:**

```typescript
context: {
  // Default implicit binding
  $implicit: item,

  // Named bindings for clarity
  item: item,
  index: index,

  // Positional information
  first: index === 0,
  last: index === items.length - 1,
  even: index % 2 === 0,
  odd: index % 2 !== 0,

  // Action callbacks
  actions: {
    select: () => this.select(item),
    delete: () => this.delete(item),
    edit: () => this.edit(item)
  },

  // Computed values
  metadata: {
    selected: this.isSelected(item),
    loading: this.isLoading(item),
    disabled: this.isDisabled(item)
  }
}
```

### When to Use ngTemplateOutlet

✅ **Use when:**

1. **Flexible Layouts** - Multiple rendering strategies for same data
2. **Reusable Components** - Accept custom templates from parent
3. **Recursive Structures** - Trees, nested menus, comments
4. **Multi-slot Components** - Header/body/footer variations
5. **Conditional Rendering** - Different templates based on state
6. **Performance Optimization** - Lazy render expensive templates

❌ **Don't use when:**

- Content is simple and doesn't need customization
- You only have one way to render the content
- The component would be cleaner with separate components
- You need to share state across slots (use component composition instead)

---

### Performance Tips

```typescript
// ✅ Good: Memoize template references
protected memoizedTemplates = computed(() => ({
  header: this.headerTemplate(),
  content: this.contentTemplate(),
  footer: this.footerTemplate()
}));

// ✅ Good: Use trackBy functions
trackByFn = input<(index: number, item: T) => any>(
  (index, item) => item.id
);

// ✅ Good: Lazy load expensive templates
@if (expanded(); as isExpanded) {
  @if (isExpanded && detailTemplate(); as tpl) {
    <ng-container *ngTemplateOutlet="tpl"></ng-container>
  }
}

// ❌ Avoid: Passing functions that create new references
// This causes unnecessary re-renders
context: {
  onClick: () => this.someMethod() // ❌ Wrong
}

// ✅ Correct: Pass stable references
toggleItem = input<(item: T) => void>();
context: {
  onClick: this.toggleItem() // ✅ Correct
}
```

---

## Summary

`ngTemplateOutlet` is a powerful tool for creating:

- Dynamic, reusable components
- Flexible layouts with multiple rendering strategies
- Scalable component systems
- Advanced state management patterns

Master it to build professional, enterprise-grade Angular applications! 🚀
