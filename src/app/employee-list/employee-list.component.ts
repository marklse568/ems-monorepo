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

  filters: string[] = [];

  constructor(private restService: EmployeeApiService) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.restService.getAllEmployees().subscribe((data) => {
      this.employees = [...data];
    });
  }

  shouldShowEmployee(index: number) {
    if (this.filters.length === 0) {
      return true;
    }

    const targetSkills = this.employees[index].skillSet;
    const match = this.filters.find((f) => targetSkills.includes(f)); // O(n²) is life
    return !!match;
  }

  onFilterChanged(filters: string[]) {
    // update display collection here or smth
    this.filters = filters;
  }
}
