import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TodoVO} from "./domain/todo.vo";
import {Observable} from "rxjs/internal/Observable";
import {ResultVO} from "./domain/result.vo";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private SERVER: string;
  header: HttpHeaders;

  constructor(private http: HttpClient) {
    this.SERVER = environment.HOST;

    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
  }

  // 할일 목록 가져오기
  getTodoList(): Observable<TodoVO[]> {
    return this.http.get<TodoVO[]>(this.SERVER + '/api/todo');
  }

  addTodo(todo: TodoVO): Observable<TodoVO> {
    return this.http.post<TodoVO>(this.SERVER + '/api/todo', todo, {headers: this.header});
  }

  modifyTodo(todo: TodoVO): Observable<TodoVO> {
    return this.http.put<TodoVO>(this.SERVER + '/api/todo', todo, {headers: this.header});
  }

  removeTodo(todo_id: number): Observable<ResultVO> {
    return this.http.delete<ResultVO>(this.SERVER + `/api/todo?todo_id=${todo_id}`);
  }
}
