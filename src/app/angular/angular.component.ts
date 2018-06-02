import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {TodoVO} from "../domain/todo.vo";
import {Form} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css'],
  animations: [
    trigger('flyInOut', [
      // 글로벌 상태 정의
      state('in', style({opacity: 1, transform: 'translate(0, 0)'})),
      // transition 정의: A => B, A상태, animate(시간, B상태)
      transition('void => in', [
        style({opacity: 0, transform: 'translate(-100%, 0)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({transform: 'translate(0, -100%)', opacity: '0'}))
      ])
    ])
  ]

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

  addTodo() {
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
