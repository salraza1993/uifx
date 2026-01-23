import { Directive, ElementRef, inject, signal } from '@angular/core';

@Directive({
  selector: '[focusGroup]',
  exportAs: 'focusGroup',
  host: {
    '(keydown)': 'onKeydown($event)'
  }
})
export class FocusGroupDirective {
  private host = inject(ElementRef<HTMLElement>);

  private items: HTMLElement[] = [];
  private activeIndex = signal(0);

  register(item: HTMLElement) {
    this.items.push(item);
    this.updateTabIndexes();
  }

  unregister(item: HTMLElement) {
    this.items = this.items.filter(i => i !== item);
  }

  focus(index: number) {
    if (!this.items.length) return;

    const max = this.items.length - 1;
    const next = (index + this.items.length) % this.items.length;

    this.activeIndex.set(next);
    this.updateTabIndexes();
    this.items[next].focus();
  }

  private updateTabIndexes() {
    this.items.forEach((el, i) => (el.tabIndex = i === this.activeIndex() ? 0 : -1));
  }

  protected onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        this.focus(this.activeIndex() + 1);
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        this.focus(this.activeIndex() - 1);
        break;

      case 'Home':
        event.preventDefault();
        this.focus(0);
        break;

      case 'End':
        event.preventDefault();
        this.focus(this.items.length - 1);
        break;
    }
  }
}
