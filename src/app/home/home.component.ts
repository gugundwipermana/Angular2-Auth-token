import { Component, OnInit }		from '@angular/core';

import { User }						from '../_models/user';
import { UserService }				from '../_services/user.service';

@Component({
	template: `<h3>Home</h3>
	<p><a [routerLink]="['/users']">Users</a></p>
	<p><a [routerLink]="['/login']">Logout</a></p>
	`,
	styles: [`

	`]
})

export class HomeComponent implements OnInit {
	users: User[] = [];

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.userService.getUsers()
			.subscribe(users => {
				this.users = users;
			});
	}
}