import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  withHashLocation,
} from '@angular/router';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './main.html',
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(
      [
        {
          path: 'inject-based',
          loadComponent: () =>
            import('./features/inject-based/inject-based.component').then(
              ({ InjectBasedComponent }) => InjectBasedComponent
            ),
        },
        {
          path: 'providers-based',
          loadComponent: () =>
            import('./features/providers-based/providers-based.component').then(
              ({ ProvidersBasedComponent }) => ProvidersBasedComponent
            ),
        },
      ],
      withHashLocation()
    ),
  ],
});
