import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient, HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifierComponent } from './notifier/notifier.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { InterceptorService } from './loader/interceptor.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminComponent } from './admin/admin.component'
import { FormBuilder, Validators } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchComponent } from './search/search.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    NotifierComponent,
    AdminComponent,
    LoginComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
