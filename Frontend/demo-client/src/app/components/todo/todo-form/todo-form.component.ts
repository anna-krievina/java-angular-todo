import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule, NgIf],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {

  todo: Todo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService) {
    this.todo = new Todo();
  }

  edit(todo: Todo) {
    this.todo = todo;
  }

  onSubmit() {
    this.todoService.save(this.todo).subscribe(result => this.gotoTodoList());
  }

  gotoTodoList() {
    this.router.navigate(['/todos']);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.todoService.get(id).subscribe(result => this.todo = result);
    });
  }
}
