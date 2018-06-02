import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TodoVO} from "./domain/todo.vo";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private SERVER: string;

  constructor(private http: HttpClient) {
    this.SERVER = environment.HOST;
  }

  // 할일 목록 가져오기
  getTodoList(): Observable<TodoVO[]> {
    return this.http.get<TodoVO[]>(this.SERVER + '/api/todo');
  }
}
