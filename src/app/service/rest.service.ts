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

  getEmployee(id: number) {
    return this.http.get<Employee>(`/backend/${id}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set(
          'Authorization',
          `Bearer ${this.keycloakService.getKeycloakInstance().token}`
        ),
    });
  }

  addEmployee(employee: Employee) {
    return this.http.post<Employee>('/backend', employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set(
          'Authorization',
          `Bearer ${this.keycloakService.getKeycloakInstance().token}`
        ),
    });
  }

  editEmployee(employee: Employee) {
    return this.http.put<Employee>(`/backend/${employee.id}`, employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set(
          'Authorization',
          `Bearer ${this.keycloakService.getKeycloakInstance().token}`
        ),
    });
  }
}
