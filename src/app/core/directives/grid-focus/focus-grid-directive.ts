import { Directive, ElementRef, inject, input, signal } from '@angular/core';
@Directive({
  selector: '[focusGrid]',
  exportAs: 'focusGrid',
  host: {
    '(keydown)': 'onKeydown($event)'
  }
})
export class FocusGridDirective {
  private host = inject(ElementRef<HTMLElement>);
  private items: HTMLElement[] = [];
  private activeIndex = signal(0);

  /** number of columns in your layout */
  focusGridColumns = input<number>(1);

  public register(item: HTMLElement) {
    this.items.push(item);
    this.updateTabIndexes();
  }

  public unregister(item: HTMLElement) {
    this.items = this.items.filter(i => i !== item);
  }

  private updateTabIndexes() {
    this.items.forEach((el, i) => {
      el.tabIndex = i === this.activeIndex() ? 0 : -1;
    });
  }

  private focus(index: number) {
    if (!this.items.length) return;

    const clamped = ((index % this.items.length) + this.items.length) % this.items.length;

    this.activeIndex.set(clamped);
    this.updateTabIndexes();
    this.items[clamped].focus();
  }

  private row(index: number) {
    return Math.floor(index / this.focusGridColumns());
  }

  private col(index: number) {
    return index % this.focusGridColumns();
  }

  private indexAt(row: number, col: number) {
    const idx = row * this.focusGridColumns() + col;
    return idx < this.items.length ? idx : -1;
  }

  protected onKeydown(event: KeyboardEvent) {
    const current = this.activeIndex();
    const col = this.col(current);
    const row = this.row(current);

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.focus(current + 1);
        break;

      case 'ArrowLeft':
        event.preventDefault();
        this.focus(current - 1);
        break;

      case 'ArrowDown': {
        event.preventDefault();
        const next = this.indexAt(row + 1, col);
        if (next !== -1) this.focus(next);
        break;
      }

      case 'ArrowUp': {
        event.preventDefault();
        const prev = this.indexAt(row - 1, col);
        if (prev !== -1) this.focus(prev);
        break;
      }

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
