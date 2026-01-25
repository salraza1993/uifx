import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { PopoverTriggerDirective } from '@app/core/directives/focus-directive/popover-trigger-directive';
import { FocusGridDirective } from '@app/core/directives/grid-focus/focus-grid-directive';
import { FocusGridItemDirective } from '@app/core/directives/grid-focus/focus-grid-item-directive';

interface MenuItem {
  label: string;
  link: string;
  description?: string;
  iconName?: string;
}
@Component({
  selector: 'sr-header-menu',
  imports: [
    PopoverTriggerDirective,
    RouterLink,
    RouterModule,
    FocusGridItemDirective,
    FocusGridDirective
  ],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.css',
  host: {
    class: 'header-menu-host block',
    '[style.--grid-cols]': 'gridCols()'
  }
})
export class HeaderMenu {
  menuDialogElement = viewChild.required<ElementRef<HTMLDialogElement>>('menuDialogElement');
  protected readonly gridCols = signal(4);
  private readonly _router = inject(Router);
  // dropdown items menu must be something like this
  // https://vercel.com/templates/next.js?utm_source=next-site&utm_medium=navbar&utm_campaign=next_site_nav_templates
  protected menus = signal<MenuItem[]>([
    {
      label: 'Tabs',
      link: '/components/tabs',
      description: 'Tabs is a container component to group content with tabs.',
      iconName: 'tabs'
    },
    {
      label: 'Buttons',
      link: '/components/buttons',
      description: 'Buttons allow users to take actions with a single tap.',
      iconName: 'buttons'
    },
    {
      label: 'Modals',
      link: '/components/modals',
      description: 'Modals are used to display content in a layer above the app.',
      iconName: 'modals'
    },
    {
      label: 'Form Elements',
      link: '/components/forms',
      description: 'Form elements are used to collect user input and data.',
      iconName: 'forms'
    },
    {
      label: 'Typography',
      link: '/components/typography',
      description: 'Typography controls the style and appearance of text elements.',
      iconName: 'typography'
    },
    {
      label: 'Cards',
      link: '/components/cards',
      description: 'Cards are used to display content and actions on a single topic.',
      iconName: 'cards'
    },
    {
      label: 'Alerts',
      link: '/components/alerts',
      description: 'Alerts display important messages and notifications to users.',
      iconName: 'alerts'
    },
    {
      label: 'Badges',
      link: '/components/badges',
      description: 'Badges display small counts, labels, or status indicators.',
      iconName: 'badges'
    },
    {
      label: 'Avatars',
      link: '/components/avatars',
      description: 'Avatars represent users or entities with profile images or initials.',
      iconName: 'avatars'
    },
    {
      label: 'Lists',
      link: '/components/lists',
      description: 'Lists display a collection of items in a structured format.',
      iconName: 'lists'
    },
    {
      label: 'Tooltips',
      link: '/components/tooltips',
      description: 'Tooltips show contextual information when hovering over elements.',
      iconName: 'tooltips'
    },
    {
      label: 'Popovers',
      link: '/components/popovers',
      description: 'Popovers display floating content panels with additional information.',
      iconName: 'popovers'
    },
    {
      label: 'Dropdowns',
      link: '/components/dropdowns',
      description: 'Dropdowns allow users to select from a list of options.',
      iconName: 'dropdowns'
    },
    {
      label: 'Progress Bars',
      link: '/components/progress-bars',
      description: 'Progress Bars visualize the completion status of tasks or processes.',
      iconName: 'progress-bars'
    },
    {
      label: 'Spinners',
      link: '/components/spinners',
      description: 'Spinners indicate loading or processing states.',
      iconName: 'spinners'
    },
    {
      label: 'Accordions',
      link: '/components/accordions',
      description: 'Accordions show expandable and collapsible content sections.',
      iconName: 'accordions'
    },
    {
      label: 'Breadcrumbs',
      link: '/components/breadcrumbs',
      description: 'Breadcrumbs show the current page location within the navigation hierarchy.',
      iconName: 'breadcrumbs'
    },
    {
      label: 'Pagination',
      link: '/components/pagination',
      description: 'Pagination allows users to navigate through multiple pages of content.',
      iconName: 'pagination'
    },
    {
      label: 'Carousels',
      link: '/components/carousels',
      description: 'Carousels display rotating content in a slideshow format.',
      iconName: 'carousels'
    },
    {
      label: 'Notifications',
      link: '/components/notifications',
      description: 'Notifications display toast messages and system alerts.',
      iconName: 'notifications'
    }
  ]);

  protected onSelectMenu(path: Partial<MenuItem>) {
    this.menuDialogElement().nativeElement.hidePopover();
    // this._router.navigateByUrl(path.link!);
  }
}
