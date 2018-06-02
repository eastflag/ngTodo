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
      transition('in => void', [
        animate(300, style({transform: 'translate(100%, 0)', opacity: '0'}))
      ])
    ])
  ]

})
export class AngularComponent implements OnInit {
  todoList: TodoVO[] = [];
  newTodo: string;
  // 취소시 원데이터를 복원하기 위한 HashMap 객체 정의
  tempMap = new Map<number, TodoVO>();

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

  update(todo: TodoVO) {
    todo.isEdited = true;

    // deep copy
    this.tempMap.set(todo.todo_id, {...todo});
  }

  restore(todo: TodoVO) {
    const temp = this.tempMap.get(todo.todo_id);

    // 값을 복사
    // todo.todo = temp.todo;
    // todo.isFinished = temp.isFinished;
    // 한번에
    Object.assign(todo, temp);

    todo.isEdited = false;
  }

  modify(todo: TodoVO) {
    this.userService.modifyTodo(todo)
      .subscribe(body => {
        // 수정된 데이터를 반영하고, 템플릿을을 일반모드로 변환
        todo.updated = body.updated;
        todo.isEdited = false;
      });
  }

  remove(todo_id: number, index: number) {
    if (confirm('삭제하시겠습니까?')) {
      this.userService.removeTodo(todo_id)
        .subscribe(body => {
          console.log(body);
          // 배열에 반영
          this.todoList.splice(index, 1);
          // this.getTodoList();
        });
    }
  }
}
