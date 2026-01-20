import { Component } from '@angular/core';
import { ContentWrapper } from '@app/components/content-wrapper/content-wrapper';
import { CustomTabs } from '@app/components/tabs/custom-tabs';

@Component({
  selector: 'sr-home',
  imports: [ContentWrapper, CustomTabs],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
