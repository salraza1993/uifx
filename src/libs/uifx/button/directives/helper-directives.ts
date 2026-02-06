import { Directive, Optional } from '@angular/core';
import { UifxButtonDirective } from './uifx-button-directive';

@Directive({
  selector: '[uifxButtonIconStart], [uifx-button-icon-start], ng-template[uifxButtonIconStart]',
  host: { class: 'uifx-btn-icon--start' }
})
export class uifxButtonIconStartDirective {
  constructor(@Optional() buttonDirective: UifxButtonDirective) {
    // Register with button directive when instantiated
    if (buttonDirective) {
      buttonDirective.registerStartIcon();
    }
  }
}

@Directive({
  selector: '[uifxButtonIconEnd], [uifx-button-icon-end], ng-template[uifxButtonIconEnd]',
  host: { class: 'uifx-btn-icon--end' }
})
export class uifxButtonIconEndDirective {
  constructor(@Optional() buttonDirective: UifxButtonDirective) {
    // Register with button directive when instantiated
    if (buttonDirective) {
      buttonDirective.registerEndIcon();
    }
  }
}

@Directive({
  selector: '[uifxButtonLabel], [uifx-button-label], ng-template[uifxButtonLabel]',
  host: { class: 'uifx-btn--label' }
})
export class uifxButtonLabelDirective {}

@Directive({
  selector: '[uifxButtonBadge], [uifx-button-badge], ng-template[uifxButtonBadge]',
  host: { class: 'uifx-btn--badge' }
})
export class uifxButtonBadgeDirective {}
