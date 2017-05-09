import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
// import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-user-form',
  template: `
    <h2>{{ title }}</h2>
    <p><a routerLink="/users" routerLinkActive="active" class="btn-gdp"><< Back</a></p>
    <form [formGroup]="form" (ngSubmit)="save()">

      <input id="id" type="hidden"
      [(ngModel)]="user.id" formControlName="id"
      [class.invalid]="form.controls['id'].touched && 
      !form.controls['id'].valid">
      

      <input id="email" type="text"
      [(ngModel)]="user.email" formControlName="email"
      [class.invalid]="form.controls['email'].touched && 
      !form.controls['email'].valid" placeholder="Email" style="margin-bottom:5px">
      <br/>
      <input id="password" type="text"
      [(ngModel)]="user.password" formControlName="password"
      [class.invalid]="form.controls['password'].touched && 
      !form.controls['password'].valid" placeholder="Password" style="margin-bottom:5px">
      <br/>
      <input id="name" type="text"
      [(ngModel)]="user.name" formControlName="name"
      [class.invalid]="form.controls['name'].touched && 
      !form.controls['name'].valid" placeholder="Name" style="margin-bottom:5px">
      <br/>

      <button type="submit" [disabled]="!form.valid" class="btn-gdp">
        Submit
      </button>
    </form>
  `,
  styles: [``]
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  user: User = new User();

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UserService
  ) {
    this.form = formBuilder.group({
      id:[],
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required/*,
        BasicValidators.email*/
        //Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      password: []
    });
  }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit User' : 'New User';

      if (!id)
        return;

      this.usersService.getUser(id)
        .subscribe(
          user => {
            this.user = JSON.parse(JSON.stringify(user));
          },
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
    });
  }

  save() {
    var result,
        userValue = this.form.value;

    if (userValue.id){
      result = this.usersService.updateUser(userValue);
    } else {
      result = this.usersService.addUser(userValue);
    }

    //result.subscribe(data => this.router.navigate(['users']));
    
    result.subscribe(
      data => {
        console.log("Success Save/Update");
      },
      error => {
        console.log("Error Save/Update");
        console.log(error);
      }
    );

    this.router.navigate(['users']);
  }
}
