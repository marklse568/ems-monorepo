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
    return this.http.get<Employee[]>('/backend/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set(
          'Authorization',
          `Bearer ${this.keycloakService.getKeycloakInstance().token}`
        ),
    });
  }

  fetchQualifications() {
    return this.http.get<Employee[]>('/backend/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set(
          'Authorization',
          `Bearer ${this.keycloakService.getKeycloakInstance().token}`
        ),
    });
  }

  getEmployee(id: number) {
    return this.http.get<Employee>(`/backend/employees/${id}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set(
          'Authorization',
          `Bearer ${this.keycloakService.getKeycloakInstance().token}`
        ),
    });
  }

  addEmployee(employee: Employee) {
    return this.http.post<Employee>('/backend/employees', employee, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set(
          'Authorization',
          `Bearer ${this.keycloakService.getKeycloakInstance().token}`
        ),
    });
  }

  editEmployee(employee: Employee) {
    return this.http.put<Employee>(
      `/backend/employees/${employee.id}`,
      employee,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set(
            'Authorization',
            `Bearer ${this.keycloakService.getKeycloakInstance().token}`
          ),
      }
    );
  }
}
