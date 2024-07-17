import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { User } from "../types/user.types";

const host = 'https://jsonplaceholder.typicode.com'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${host}/users`).pipe(
      catchError(error => {
        throw error
      })
    )
  }

  getUserDetail(id: string): Observable<User> {
    return this.http.get<User>(`${host}/users/${id}`).pipe(
      catchError(error => {
        throw error
      })
    )
  }
}
