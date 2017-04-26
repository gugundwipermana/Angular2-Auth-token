import { Component, OnInit }		from '@angular/core';
import { Router }					from '@angular/router';

import { AuthenticationService }	from '../_services/authentication.service';

@Component({
	template: `<h3>Login</h3>
		<form name="form" (ngSubmit)="login()" #f="ngForm" novalidate>
			<div [ngClass]="{ 'has-error': f.submitted }">
				<label for="email">Email</label>
				<input type="text" name="email" [(ngModel)]="model.email" #email="ngModel" required />
				<div *ngIf="f.submitted">Email is required</div>
			</div>
			<div [ngClass]="{ 'has-error': f.submitted }">
				<label for="password">Password</label>
				<input type="password" name="password" [(ngModel)]="model.password" #password="ngModel" required />
				<div *ngIf="f.submitted">Password is required</div>
			</div>
			<div>
				<button [disabled]="loading">Login</button>
				<img *ngIf="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />

			</div>
			<div *ngIf="error">{{ error }}</div>
		</form>
	`,
	styles: [`

	`]
})

export class LoginComponent implements OnInit {
	model: any = {};
	loading = false;
	error = '';

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {
		this.authenticationService.logout();
	}

	login() {
		this.loading = true;
		this.authenticationService.login(this.model.email, this.model.password)
			.subscribe(result => {
				if(result === true) {
					this.router.navigate(['/']);
				} else {
					this.error = 'Username or password is incorrect';
					this.loading = false;
				}
			});
	}
}