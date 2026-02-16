import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo/todo-form/todo-form.component';

export const routes: Routes = [
  { path: 'todos', component: TodoListComponent },
  { path: 'savetodo', component: TodoFormComponent },
  { path: 'savetodo/:id', component: TodoFormComponent },
  { path: '', redirectTo: '/todos', pathMatch: 'full' }
];
