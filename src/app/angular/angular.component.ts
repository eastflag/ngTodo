import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {TodoVO} from "../domain/todo.vo";
import {Form} from "@angular/forms";

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent implements OnInit {
  todoList: TodoVO[] = [];
  newTodo: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    this.userService.getTodoList()
      .subscribe(body => {
        this.todoList = body;
        console.log(this.todoList);
      });
  }

  addTodo(myForm: Form) {
    console.log('add todo');
    const todo = new TodoVO();
    todo.todo = this.newTodo;

    this.userService.addTodo(todo)
      .subscribe(body => {
        // todoList 맨 앞에 데이터를 추가한다.
        this.todoList.unshift(body);
        // 입력된 값 삭제
        this.newTodo = null;
      });
  }
}
