import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo/todo-form/todo-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'todos', component: TodoListComponent },
  { path: 'savetodo', component: TodoFormComponent },
  { path: 'savetodo/:id', component: TodoFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }//,
  // { path: '', redirectTo: '/todos', pathMatch: 'full' }
];
