import { Component } from '@angular/core';
import { ContentWrapper } from '../content-wrapper/content-wrapper';
import { ThemeChanger } from "../theme-changer/theme-changer";
import { Logo } from "../logo/logo";

@Component({
  selector: 'sr-header',
  imports: [ContentWrapper, ThemeChanger, Logo],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: { class: 'sr-header border' },
})
export class Header {}
