import { Component, OnInit } from '@angular/core';
import { EmployeeApiService } from '../service/employee-api.service';
import { Qualification } from '../model/Qualification';

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.css'],
})
export class QualificationListComponent implements OnInit {
  qualifications: Qualification[] = [];

  constructor(private restService: EmployeeApiService) {}

  ngOnInit() {
    this.restService.getAllQualifications().subscribe((data) => {
      this.qualifications = [...data];
    });
  }

  onSkillAdded(qualification: Qualification) {
    this.qualifications.push(qualification);
  }
}
