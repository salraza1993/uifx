import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@app/components/header/header';
import { AppConfigService } from '../stores/browser-store/app-config-service/app-config-service';
import { ScrollProgress } from "@app/components/scroll-progress/scroll-progress";

@Component({
  selector: 'sr-root',
  imports: [RouterOutlet, Header, ScrollProgress],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [AppConfigService],
})
export class App implements OnInit {
  protected readonly _appConfigService = inject(AppConfigService);

  ngOnInit(): void {
    this._appConfigService.initializeAppConfig();
  }
}
