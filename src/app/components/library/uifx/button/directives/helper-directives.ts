import { Directive } from '@angular/core';

@Directive({
  selector: '[uifxStartIcon], [uifx-start-icon], ng-template[uifxStartIcon]',
  host: { class: 'uifx-icon--start' }
})
export class UifxStartIconDirective {}

@Directive({
  selector: '[uifxEndIcon], [uifx-end-icon], ng-template[uifxEndIcon]',
  host: { class: 'uifx-icon--end' }
})
export class UifxEndIconDirective {}

@Directive({
  selector: '[uifxLabel], [uifx-label], ng-template[uifxLabel]',
  host: { class: 'uifx--label' }
})
export class UifxLabelDirective {}
