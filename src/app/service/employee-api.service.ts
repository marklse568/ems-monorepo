import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Employee } from '../model/Employee';
import { Qualification } from '../model/Qualification';
import { ToastPosition, ToastType } from '../model/Toast';
import { ToastService } from './toast.service';
import { EmployeeQualifications } from '../model/EmployeeQualifications';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  private BASE_URL = '/backend' as const;

  constructor(private http: HttpClient, private toaster: ToastService) {}

  getAllEmployees() {
    return this.http
      .get<Employee[]>(`${this.BASE_URL}/employees`)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  getEmployee(id: number) {
    return this.http
      .get<Employee>(`${this.BASE_URL}/employees/${id}`)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  addEmployee(employee: Employee) {
    return this.http
      .post<Employee>(`${this.BASE_URL}/employees`, employee)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  editEmployee(employee: Employee) {
    return this.http
      .put<Employee>(`${this.BASE_URL}/employees/${employee.id}`, employee)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  deleteEmployee(employee: Employee) {
    return this.http
      .delete(`${this.BASE_URL}/employees/${employee.id}`)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  getAllQualifications() {
    return this.http
      .get<Qualification[]>(`${this.BASE_URL}/qualifications`)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  addQualification(qualification: Qualification) {
    return this.http
      .post<Qualification>(`${this.BASE_URL}/qualifications`, qualification)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  addQualificationToEmployee(employeeId: number, qualification: Qualification) {
    return this.http
      .post<EmployeeQualifications>(
        `${this.BASE_URL}/employees/${employeeId}/qualifications`,
        qualification
      )
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  removeQualificationFromEmployee(
    employeeId: number,
    qualification: Qualification
  ) {
    return this.http
      .delete<EmployeeQualifications>(
        `${this.BASE_URL}/employees/${employeeId}/qualifications`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: qualification,
        }
      )
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  getAllQualificationsOfEmployee(employeeId: number) {
    return this.http
      .get<EmployeeQualifications>(
        `${this.BASE_URL}/employees/${employeeId}/qualifications`
      )
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  deleteQualification(qualification: Qualification) {
    const body = { skill: qualification.skill };
    return this.http
      .delete<Qualification>('/backend/qualifications', {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: body,
      })
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.toaster.show(
        'Error',
        error.error.message,
        4,
        ToastType.Danger,
        ToastPosition.TopRight
      );
      console.error('An error occurred:', error.error);
    } else if (error.status === 400) {
      this.toaster.show(
        'Bad Request',
        error.error.message,
        4,
        ToastType.Danger,
        ToastPosition.TopRight
      );
      console.error('Bad Request:', error.error);
    } else if (error.status === 401) {
      this.toaster.show(
        'Unauthorized',
        error.error.message,
        4,
        ToastType.Danger,
        ToastPosition.TopRight
      );
      console.error('Unauthorized:', error.error);
    } else if (error.status === 404) {
      this.toaster.show(
        'Not Found',
        error.error.message,
        4,
        ToastType.Danger,
        ToastPosition.TopRight
      );
      console.error('Not Found:', error.error);
    } else if (error.status === 500) {
      this.toaster.show(
        'Internal Server Error',
        error.error.message,
        4,
        ToastType.Danger,
        ToastPosition.TopRight
      );
      console.error('Internal Server Error:', error.error);
    } else {
      this.toaster.show(
        'Error',
        error.error.message,
        5,
        ToastType.Danger,
        ToastPosition.TopRight
      );
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
