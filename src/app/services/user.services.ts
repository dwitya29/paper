import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../types/user.types";

const host = 'https://jsonplaceholder.typicode.com'

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${host}/users`)
  }

  getUserDetail(id: string): Observable<User> {
    return this.http.get<User>(`${host}/users/${id}`)
  }
}
