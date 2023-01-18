import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../model/Employee';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;

  constructor(private restService: RestService) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.restService.fetchEmployees();
  }
}
