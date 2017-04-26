import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  template: `
  	<nav>
		  <div class="nav-wrapper">
		    <a routerLink="" class="brand-logo">LOGO</a>
		    <ul id="nav-mobile" class="right">
		      
		      	<li><a routerLink="/" routerLinkActive="active">Home</a></li>
				<li><a routerLink="/users" routerLinkActive="active">Users</a></li>
				<li><a [routerLink]="['/login']">Logout</a></li>
		    </ul>
		  </div>
		</nav>
  `,
  styles: [``]
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
