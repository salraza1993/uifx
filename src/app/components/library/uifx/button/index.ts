import { UifxButtonDirective } from './directives/uifx-button-directive';
import {
  UifxEndIconDirective,
  UifxLabelDirective,
  UifxStartIconDirective
} from './directives/helper-directives';
import { UifxButton } from './uifx-button';

export * from './directives/uifx-button-directive';
export * from './directives/helper-directives';
export * from './helpers/uifx-button-models';
export * from './uifx-button';

// Group them together
export const UifxButtonModule = [
  UifxButton,
  UifxButtonDirective,
  UifxStartIconDirective,
  UifxEndIconDirective,
  UifxLabelDirective
] as const;

// Still export individual items for advanced use cases
export {
  UifxButton,
  UifxButtonDirective,
  UifxEndIconDirective,
  UifxLabelDirective,
  UifxStartIconDirective
};
