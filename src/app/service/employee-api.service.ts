import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Employee } from '../model/Employee';
import { Qualification } from '../model/Qualification';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  constructor(private http: HttpClient) {}

  getAllEmployees() {
    return this.http
      .get<Employee[]>('/backend/employees')
      .pipe(catchError(this.handleError));
  }

  getEmployee(id: number) {
    return this.http
      .get<Employee>(`/backend/employees/${id}`)
      .pipe(catchError(this.handleError));
  }

  addEmployee(employee: Employee) {
    return this.http
      .post<Employee>('/backend/employees', employee)
      .pipe(catchError(this.handleError));
  }

  editEmployee(employee: Employee) {
    return this.http
      .put<Employee>(`/backend/employees/${employee.id}`, employee)
      .pipe(catchError(this.handleError));
  }

  getAllQualifications() {
    return this.http
      .get<Qualification[]>('/backend/qualifications')
      .pipe(catchError(this.handleError));
  }

  addQualification(qualification: Qualification) {
    return this.http
      .post<Qualification>('/backend/qualifications', qualification)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else if (error.status === 400) {
      console.error('Bad Request:', error.error);
    } else if (error.status === 401) {
      console.error('Unauthorized:', error.error);
    } else if (error.status === 404) {
      console.error('Not Found:', error.error);
    } else if (error.status === 500) {
      console.error('Internal Server Error:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
