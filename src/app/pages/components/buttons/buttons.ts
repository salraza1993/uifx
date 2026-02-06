import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GridContent } from '@app/components/grid-content/grid-content';
import { ButtonsIconFull } from '@app/components/icons/buttons-icon-full/buttons-icon-full';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { HeroTitle } from '@components/hero-title/hero-title';
import { UIFX_BUTTON } from '@uifx/button';
import { UifxButtonGroup, UifxButtonGroupDirective } from '@uifx/button-group';
import { UifxDivider } from '@uifx/divider';

@Component({
  selector: 'buttons',
  imports: [
    HeroTitle,
    ContentWrapper,
    ButtonsIconFull,
    UIFX_BUTTON,
    GridContent,
    UifxDivider,
    RouterLink,
    UifxButtonGroup,
    UifxButtonGroupDirective
  ],
  templateUrl: './buttons.html',
  styleUrls: ['./buttons.css']
})
export class Buttons {
  isSaving = signal(false);
  saveChange = signal(false);
  isValid = signal(false);
  handleSave() {
    this.isSaving.set(true);
    setTimeout(() => this.isSaving.set(false), 5000);
  }

  handleValidate() {
    this.saveChange.set(true);
    setTimeout(() => {
      this.saveChange.set(false);
    }, 2000);
  }
}
