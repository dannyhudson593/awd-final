import {Injectable} from '@angular/core';
import {Headers, Http, ResponseOptions} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DbOperationsService {
  apiURL = 'https://localhost/xampp/awd-rest-api/';

  constructor(private http: Http) {
  }

  // Save users
  saveUsers(users: any[]) {
    console.log(users);
    this.http.post(this.apiURL, users)
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body', val);
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        }
      );
  }

  // Get all users
  getUsers() {
    const headers = new Headers({
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Max-Age': '1728000',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.get(this.apiURL, {
      headers: headers
    });
  }

  // Update user
  updateUser(user) {
    return this.http.put(this.apiURL, user).subscribe(
      (val) => {
        console.log('UPDATE call successful value returned in body',
          val);
      },
      response => {
        console.log('UPDATE call in error', response);
      },
      () => {
        console.log('The UPDATE observable is now completed.');
      });
  }

  // Delete user
  deleteUser(user) {
    this.http.delete(this.apiURL, new ResponseOptions({body: user})).subscribe(
      (val) => {
        console.log('DELETE call successful value returned in body',
          val);
      },
      response => {
        console.log('DELETE call in error', response);
      },
      () => {
        console.log('The DELETE observable is now completed.');
      });
  }

}
