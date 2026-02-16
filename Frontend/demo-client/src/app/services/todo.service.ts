import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../components/todo/model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  public save(todo: Todo) {
    return this.http.post<Todo>(this.baseUrl, todo);
  }

  public get(todoId: Number) {
    return this.http.get<Todo>(`${this.baseUrl}/${todoId}`);
  }

  public delete(todoId: Number) {
    return this.http.delete<void>(`${this.baseUrl}/${todoId}`);
  }

  public swap(todoId1: Number, todoId2: Number) {
    return this.http.get<void>(`${this.baseUrl}/${todoId1}/${todoId2}`);
  }
}
