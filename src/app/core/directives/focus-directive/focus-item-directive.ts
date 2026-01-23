import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { FocusGroupDirective } from './focus-group-directive';

@Directive({
  selector: '[focusItem]'
})
export class FocusItemDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private group = inject(FocusGroupDirective);

  ngOnInit() {
    this.el.nativeElement.tabIndex = -1;
    this.group.register(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.group.unregister(this.el.nativeElement);
  }
}
