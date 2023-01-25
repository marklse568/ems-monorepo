import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Employee } from '../model/Employee';
import { Qualification } from '../model/Qualification';
import { ToastPosition, ToastType } from '../model/Toast';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  constructor(private http: HttpClient, private toaster: ToastService) {}

  getAllEmployees() {
    return this.http
      .get<Employee[]>('/backend/employees')
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  getEmployee(id: number) {
    return this.http
      .get<Employee>(`/backend/employees/${id}`)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  addEmployee(employee: Employee) {
    return this.http
      .post<Employee>('/backend/employees', employee)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  editEmployee(employee: Employee) {
    return this.http
      .put<Employee>(`/backend/employees/${employee.id}`, employee)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  getAllQualifications() {
    return this.http
      .get<Qualification[]>('/backend/qualifications')
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  addQualification(qualification: Qualification) {
    return this.http
      .post<Qualification>('/backend/qualifications', qualification)
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
