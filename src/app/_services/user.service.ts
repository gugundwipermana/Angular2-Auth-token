import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { User } from '../_models/user';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Basic ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        console.log("Hi: "+this.authenticationService.token);

        // get users from api
        return this.http.get('http://localhost:8080/ForAngular2-1.0-SNAPSHOT/api/users', options)
            .map((response: Response) => response.json());
    }
}