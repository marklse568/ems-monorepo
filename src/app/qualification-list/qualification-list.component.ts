import { Component, OnInit } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { EmployeeApiService } from '../service/employee-api.service';
import { Qualification } from '../model/Qualification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.css'],
})
export class QualificationListComponent implements OnInit {
  qualifications$: Observable<Qualification[]>;
  newName: string;

  constructor(private restService: EmployeeApiService, private router: Router) {
    this.qualifications$ = of([]);
    this.newName = '';
  }

  async ngOnInit() {
    this.qualifications$ = await this.restService.fetchQualifications();
  }

  save() {
    this.restService
      .addQualification(new Qualification(this.newName))
      .then((observable) => {
        observable.subscribe((q) => {});
      });
  }
}
