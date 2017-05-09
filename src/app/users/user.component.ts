import { Component, OnInit }		from '@angular/core';

import { User }						from '../_models/user';
import { UserService }				from '../_services/user.service';

@Component({
	selector: 'app-user-list',
	template: `<h3>Users</h3>
		<p><a routerLink="/users/new" routerLinkActive="active" class="btn-gdp">Add</a></p>

		<p>Displaying <strong>{{ users.length }}</strong> users</p>

		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Password</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				<tr *ngFor="let user of users">
					<td>{{ user.name }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.password }}</td>
					<td>
						<a [routerLink]="['/users', user.id]" class="btn-gdp">Edit</a>
					</td>
					<td>
						<a (click)="deleteUser(user)" class="btn-gdp">Delete</a>
					</td>
				</tr>
			</tbody>
		</table>
	`,
	styles: [`
		
	`]
})

export class UserComponent implements OnInit {
	private users: User[] = [];

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.userService.getUsers()
			.subscribe(users => {
				this.users = users;
			});
	}

	deleteUser(user) {
		if(confirm("Apa anda yakin mendelete " + user.name + "?")) {
			 var index = this.users.indexOf(user);
			 this.users.splice(index, 1);

			 this.userService.deleteUser(user.id)
			 	.subscribe(
			 		data => {
			 			console.log("Success mendelete!");
			 		},
			 		error => {
			 			console.log("Tidak bisa mendelete!");
			 			alert("Tidak bisa mendelete (ERROR)");
			 			this.users.splice(index, 0, user);

			 			// console.log(error);
			 		}
			 	);
		}
	}
}