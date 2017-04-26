import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import { User } from '../_models/user';

@Injectable()
export class UserService {

    private url: string = "http://localhost:8080/ForAngular2-1.0-SNAPSHOT/api/users";

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
        return this.http.get(this.url, options)
            .map((response: Response) => response.json());
    }

    getUser(id): Observable<User[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Basic ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        console.log("Hi: "+this.authenticationService.token);

        // get users from api
        return this.http.get(this.getUserUrl(id), options)
            .map((response: Response) => response.json());
    }



    addUser(user){
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.authenticationService.token });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.url, JSON.stringify(user), options)
        .map(res => res);
    }

    updateUser(user){
      let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.authenticationService.token });
      let options = new RequestOptions({ headers: headers });

      return this.http.put(this.url, JSON.stringify(user), options)
        .map(res => res);
    }

    deleteUser(id){
      let headers = new Headers({ 'Authorization': 'Basic ' + this.authenticationService.token });
      let options = new RequestOptions({ headers: headers });

      return this.http.delete(this.getUserUrl(id), options)
        .map(res => res);
    }


    private getUserUrl(id) {
        return this.url + "/" + id;
    }
}