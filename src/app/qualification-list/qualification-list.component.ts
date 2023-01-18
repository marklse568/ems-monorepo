import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RestService } from '../service/rest.service';
import { Qualification } from '../model/Qualification';

@Component({
  selector: 'app-qualification-list',
  templateUrl: './qualification-list.component.html',
  styleUrls: ['./qualification-list.component.css'],
})
export class QualificationListComponent {
  qualifications$: Observable<Qualification[]>;

  constructor(private restService: RestService) {
    this.qualifications$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.qualifications$ = this.restService.fetchQualifications();
  }
}
