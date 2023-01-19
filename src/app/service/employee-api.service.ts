import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Employee } from '../model/Employee';
import { Qualification } from '../model/Qualification';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  token: string | undefined;
  constructor(
    private keycloakService: KeycloakService,
    private http: HttpClient
  ) {
    keycloakService.getToken().then((t) => {
      this.token = t;
    });
  }

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

  async fetchQualifications() {
    console.log('1  =  ' + this.token);

    return this.http.get<Qualification[]>('/backend/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.token}`),
    });
  }

  async addQualification(qualification: Qualification) {
    console.log('2  =  ' + this.token);

    return this.http.post<Qualification>(
      '/backend/qualifications',
      qualification,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.token}`),
      }
    );
  }
}
