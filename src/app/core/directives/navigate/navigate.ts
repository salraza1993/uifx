import { Location } from '@angular/common';
import { Directive, inject, input } from '@angular/core';
import { Router } from '@angular/router';
@Directive({
  selector: '[navigate]',
  host: {
    '(click)': 'onClick()',
    '(keydown.enter)': 'onEnter() && onClick()',
    '(keydown.space)': 'onBackspace() && onClick()',
    class: 'cursor--pointer focus--outline-offset'
  }
})
export class NavigateDirective {
  path = input<string | undefined>(undefined);
  onBackspace = input<boolean>(false);
  onEnter = input<boolean>(false);
  private _router = inject(Router);
  private _location = inject(Location);

  onClick() {
    if (this.path() && this.path()?.toLowerCase() !== 'back') {
      this._router.navigateByUrl(this.path()!);
    } else {
      this._location.back();
    }
  }
}
