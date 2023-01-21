import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/Employee';
import { EmployeeApiService } from '../service/employee-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private restService: EmployeeApiService) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.restService.getAllEmployees().subscribe((data) => {
      this.employees = [...data];
    });
  }
}
