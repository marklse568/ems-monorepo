import { Component } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Employee } from '../model/Employee';
import { EmployeeApiService } from '../service/employee-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;

  constructor(private employeeApiService: EmployeeApiService) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.employeeApiService.getAllEmployees();
  }

  deleteEmployee(employee: Employee) {
    firstValueFrom(this.employeeApiService.deleteEmployee(employee))
      .then((q) => {
        this.fetchData();
      })
      .catch(() => {
        console.error('failed to delete employee');
      });
  }
}
