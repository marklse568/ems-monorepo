import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Employee } from '../model/Employee';
import { Qualification } from '../model/Qualification';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  constructor(
    private keycloakService: KeycloakService,
    private http: HttpClient
  ) {}

  fetchEmployees() {
    return this.http.get<Employee[]>('/backend/employees');
  }

  getEmployee(id: number) {
    return this.http.get<Employee>(`/backend/employees/${id}`);
  }

  addEmployee(employee: Employee) {
    return this.http.post<Employee>('/backend/employees', employee);
  }

  editEmployee(employee: Employee) {
    return this.http.put<Employee>(
      `/backend/employees/${employee.id}`,
      employee
    );
  }

  fetchQualifications() {
    return this.http.get<Qualification[]>('/backend/qualifications');
  }

  addQualification(qualification: Qualification) {
    return this.http.post<Qualification>(
      '/backend/qualifications',
      qualification
    );
  }
}
