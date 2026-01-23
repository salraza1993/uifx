import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { FocusGridDirective } from './focus-grid-directive';

@Directive({
  selector: '[focusGridItem]',
})
export class FocusGridItemDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private grid = inject(FocusGridDirective);

  ngOnInit() {
    this.el.nativeElement.tabIndex = -1;
    this.grid.register(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.grid.unregister(this.el.nativeElement);
  }

}
