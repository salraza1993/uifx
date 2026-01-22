import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PopoverTriggerDirective } from '@directives/popover-trigger-directive';

@Component({
  selector: 'sr-header-menu',
  imports: [PopoverTriggerDirective, RouterLink, RouterModule],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.css',
})
export class HeaderMenu {
  // dropdown items menu must be something like this
  // https://vercel.com/templates/next.js?utm_source=next-site&utm_medium=navbar&utm_campaign=next_site_nav_templates
  protected menus = signal([
    { label: 'Tabs', link: '/components/tabs' },
    { label: 'Buttons', link: '/components/buttons' },
    { label: 'Modals', link: '/components/modals' },
    { label: 'Form Elements', link: '/components/forms' },
    { label: 'Typography', link: '/components/typography' },
    { label: 'Cards', link: '/components/cards' },
    { label: 'Alerts', link: '/components/alerts' },
    { label: 'Badges', link: '/components/badges' },
    { label: 'Avatars', link: '/components/avatars' },
    { label: 'Lists', link: '/components/lists' },
    { label: 'Tooltips', link: '/components/tooltips' },
    { label: 'Popovers', link: '/components/popovers' },
    { label: 'Dropdowns', link: '/components/dropdowns' },
    { label: 'Progress Bars', link: '/components/progress-bars' },
    { label: 'Spinners', link: '/components/spinners' },
    { label: 'Accordions', link: '/components/accordions' },
    { label: 'Breadcrumbs', link: '/components/breadcrumbs' },
    { label: 'Pagination', link: '/components/pagination' },
    { label: 'Carousels', link: '/components/carousels' },
    { label: 'Notifications', link: '/components/notifications' },
  ]);
}
