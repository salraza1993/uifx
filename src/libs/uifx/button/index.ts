import {
  uifxButtonBadgeDirective,
  uifxButtonIconEndDirective,
  uifxButtonIconStartDirective,
  uifxButtonLabelDirective
} from './directives/helper-directives';
import { UifxButtonDirective } from './directives/uifx-button-directive';
import { UifxButton } from './uifx-button';

export * from './directives/helper-directives';
export * from './directives/uifx-button-directive';
export * from './modals/uifx-button-models';
export * from './uifx-button';

// Group them together
export const UIFX_BUTTON = [
  UifxButton,
  UifxButtonDirective,
  uifxButtonIconStartDirective,
  uifxButtonIconEndDirective,
  uifxButtonLabelDirective,
  uifxButtonBadgeDirective
] as const;

// Still export individual items for advanced use cases
export {
  UifxButton,
  uifxButtonBadgeDirective,
  UifxButtonDirective,
  uifxButtonIconEndDirective,
  uifxButtonIconStartDirective,
  uifxButtonLabelDirective
};
