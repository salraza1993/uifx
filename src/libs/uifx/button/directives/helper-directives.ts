import { Directive, Optional } from '@angular/core';
import { UifxButtonDirective } from './uifx-button-directive';

@Directive({
  selector: '[uifxStartIcon], [uifx-start-icon], ng-template[uifxStartIcon]',
  standalone: true,
  host: { class: 'uifx-btn-icon--start' }
})
export class UifxStartIconDirective {
  constructor(@Optional() buttonDirective: UifxButtonDirective) {
    // Register with button directive when instantiated
    if (buttonDirective) {
      buttonDirective.registerStartIcon();
    }
  }
}

@Directive({
  selector: '[uifxEndIcon], [uifx-end-icon], ng-template[uifxEndIcon]',
  standalone: true,
  host: { class: 'uifx-btn-icon--end' }
})
export class UifxEndIconDirective {
  constructor(@Optional() buttonDirective: UifxButtonDirective) {
    // Register with button directive when instantiated
    if (buttonDirective) {
      buttonDirective.registerEndIcon();
    }
  }
}

@Directive({
  selector: '[uifxLabel], [uifx-label], ng-template[uifxLabel]',
  standalone: true,
  host: { class: 'uifx-btn--label' }
})
export class UifxLabelDirective {}
