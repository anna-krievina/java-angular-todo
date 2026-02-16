import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../model/todo';
import { RouterLink } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  imports: [RouterLink, CdkDrag, CdkDropList],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: Todo[];

  constructor(private todoService: TodoService) {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    let todoId1: Number = this.todos[event.previousIndex].id;
    let todoId2: Number = this.todos[event.currentIndex].id;
    this.todoService.swap(todoId1, todoId2).subscribe(result => this.getTodoList());
  }

  deleteTask(todoId: Number) {
    this.todoService.delete(todoId).subscribe(result => this.getTodoList());
  }

  getTodoList() {
    this.todoService.findAll().subscribe(data => {
      this.todos = data;
    });
  }

  ngOnInit() {
    this.getTodoList();
  }
}
