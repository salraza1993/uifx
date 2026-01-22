import { Directive, ElementRef, HostBinding, inject, input, OnDestroy, OnInit, signal } from '@angular/core';

@Directive({
  selector: '[popoverTrigger]',
  exportAs: 'popoverTrigger'
})
export class PopoverTriggerDirective implements OnInit, OnDestroy {
  private host = inject(ElementRef<HTMLButtonElement>);
  private popoverElement!: HTMLElement;
  popoverTriggerFor = input.required<string>();
  readonly isOpen = signal(false);

  // CDK-style CSS hook
  @HostBinding('class.popover-open')
  get openClass() {
    return this.isOpen();
  }

  // Accessibility (CDK always does this)
  @HostBinding('attr.aria-expanded')
  get ariaExpanded() {
    return this.isOpen();
  }

  private onToggle = () => {
    this.isOpen.set(this.popoverElement.matches(':popover-open'));
  };
  ngOnInit(): void {
    this.popoverElement = document.getElementById(this.popoverTriggerFor()!)!;

    if (!this.popoverElement) {
      throw new Error(
        `popoverTriggerFor="${this.popoverTriggerFor}" not found`
      );
    }

    this.popoverElement.addEventListener('toggle', this.onToggle);
  }

  ngOnDestroy(): void {
    this.popoverElement.removeEventListener('toggle', this.onToggle);
  }
}
