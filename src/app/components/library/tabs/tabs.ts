import { Component } from '@angular/core';
import { FocusGroupDirective } from '@directives/focus-directive/focus-group-directive';
import { FocusItemDirective } from '@directives/focus-directive/focus-item-directive';

@Component({
  selector: 'tabs',
  imports: [FocusGroupDirective, FocusItemDirective],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css'
})
export class Tabs {}
