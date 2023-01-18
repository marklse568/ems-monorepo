import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(
    private keycloakService: KeycloakService,
    private http: HttpClient
  ) {}

  fetchEmployees() {
    return this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set(
          'Authorization',
          `Bearer ${this.keycloakService.getKeycloakInstance().token}`
        ),
    });
  }
}
