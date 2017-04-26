import { Component, OnInit }		from '@angular/core';

import { User }						from '../_models/user';
import { UserService }				from '../_services/user.service';

@Component({
	template: `<h3>Users</h3>
	<p><a [routerLink]="['/']">Home</a></p>
	<br/>
	<ul>
		<li *ngFor="let user of users">{{ user.name }}</li>
	</ul>
	`,
	styles: [`

	`]
})

export class UserComponent implements OnInit {
	users: User[] = [];

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.userService.getUsers()
			.subscribe(users => {
				this.users = users;
			});
	}
}