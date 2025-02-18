import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private keycloakService: KeycloakService) {}

  logout() {
    this.keycloakService.logout(window.location.origin);
  }
}
