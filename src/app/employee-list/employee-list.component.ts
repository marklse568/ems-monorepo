import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../Employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  bearer =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE2NzQwMzIxNzUsImlhdCI6MTY3NDAyODU3NSwianRpIjoiMzcyZjQzYzUtOGM0NS00Mjg0LTkwNGEtNTc0NDQzNTkxZTQ3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI0M2YzNzBlNS05NjM5LTQwNmItYWQ4YS1kNTM2Njc2ZDY0MWEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.cbl3qA8BdkVRkmkj4o3Yrie8-K-83X3CMwYhG8pxPuhS7zxx-vIzr199pPKiesf9nd5Ej03An3p7GR42BBdPfaQz-x54S73_IzPpZLPZhZ6sndOgqlh1Olp4EjLcCuZTupQcY5NJt4-5_WBEgKXqgaRIRC2paFq7wo3XuKcmNmS4PtlV6grhQ6ynecuucZRH5Q4X0qfP75VWtqSSIp5EvQGyaMTqOx8Nt1xK2bxqsqYIasPo-H12WFJ97bTjLySPZmT84V6X-JKXTZ9BGoI5ey1V243vC-qTCQREVVXAhAQQGWa5n958M8pp326QKzVRt9sLE9OQSvxxBH16UzSseQ';
  employees$: Observable<Employee[]>;

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`),
    });
  }
}
