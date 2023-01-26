import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './security/keycloak-init.factory';
import { QualificationListComponent } from './qualification-list/qualification-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateOrEditEmployeeComponent } from './create-or-edit-employee/create-or-edit-employee.component';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './service/toast.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    QualificationListComponent,
    NavbarComponent,
    CreateOrEditEmployeeComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    ToastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
