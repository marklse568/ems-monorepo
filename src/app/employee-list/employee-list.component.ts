import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../Employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    console.log(this.keycloakService.getKeycloakInstance().token);
    this.employees$ = this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set(
          'Authorization',
          `Bearer ${this.keycloakService.getKeycloakInstance().token}`
        ),
    });
  }
}
