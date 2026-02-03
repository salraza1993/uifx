import { Component, signal } from '@angular/core';
import { GridContent } from '@app/components/grid-content/grid-content';
import { ButtonsIconFull } from '@app/components/icons/buttons-icon-full/buttons-icon-full';
import { Divider } from '@app/components/library/divider/divider';
import { UifxButtonModule } from '@app/components/library/uifx/button';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { HeroTitle } from '@components/hero-title/hero-title';

@Component({
  selector: 'buttons',
  imports: [HeroTitle, ContentWrapper, ButtonsIconFull, UifxButtonModule, GridContent, Divider],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css'
})
export class Buttons {
  isSaving = signal(false);
  isValid = signal(true);
  handleSave() {
    this.isSaving.set(true);
    alert('Save button clicked!');
    setTimeout(() => {
      this.isSaving.set(false);
    }, 2000);
  }
}
