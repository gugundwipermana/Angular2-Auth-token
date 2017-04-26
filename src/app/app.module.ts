import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { routing }         from './app.routing';

import { HomeComponent }   from './home/home.component';
import { LoginComponent }  from './login/login.component';
import { UserComponent }  from './users/user.component';

import { AuthGuard }       from './_guards/auth.guard';
import { AuthenticationService }       from './_services/authentication.service';
import { UserService }       from './_services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
