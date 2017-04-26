import { ModuleWithProviders }		from '@angular/core';
import { Routes, RouterModule }		from '@angular/router';

import { AuthGuard }				from './_guards/auth.guard';

import { HomeComponent }			from './home/home.component';
import { LoginComponent }			from './login/login.component';
import { UserComponent }			from './users/user.component';

const appRoutes: Routes = [
	{ 
		path: '', 
		pathMatch: 'full', 
		component: HomeComponent, 
		canActivate: [AuthGuard] 
	},
	{ path: 'login', component: LoginComponent },
	{ path: 'users', component: UserComponent, canActivate: [AuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);