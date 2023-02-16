import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
/**
 * Service that provides the interface for getting information
 * about `Todos` from the server.
 */
@Injectable()
export class TodoService {
  // The URL for the todos part of the server API.
  readonly todoUrl: string = environment.apiUrl + 'todos';

  // The private `HttpClient` is *injected* into the service
  // by the Angular framework. This allows the system to create
  // only one `HttpClient` and share that across all services
  // that need it, and it allows us to inject a mock version
  // of `HttpClient` in the unit tests so they don't have to
  // make "real" HTTP calls to a server that might not exist or
  // might not be currently running.
  constructor(private httpClient: HttpClient) {
  }

   getTodos(filters?: { owner?: string; body?: string; category?: string; status?: string  }): Observable<Todo[]> {
    // `HttpParams` is essentially just a map used to hold key-value
    // pairs that are then encoded as "?key1=value1&key2=value2&…" in
    // the URL when we make the call to `.get()` below.
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if (filters.body) {
        httpParams = httpParams.set('contains', filters.body);
      }
      if (filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }
      if (filters.status) {
        httpParams = httpParams.set('status', filters.status);
      }
    }
    // Send the HTTP GET request with the given URL and parameters.
    // That will return the desired `Observable<Todo[]>`.
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  /**
   * Get the `Todo` with the specified ID.
   *
   * @param id the ID of the desired todo
   * @returns an `Observable` containing the resulting todo.
   */
   getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  /**
   * A service method that filters an array of `Todo` using
   * the specified filters.
   *
   * Note that the filters here support partial matches. Since the
   * matching is done locally we can afford to repeatedly look for
   * partial matches instead of waiting until we have a full string
   * to match against.
   *
   * @param todos the array of `Todos` that we're filtering
   * @param filters the map of key-value pairs used for the filtering
   * @returns an array of `Todos` matching the given filters
   */
   filterTodos(todos: Todo[], filters: { owner?: string; body?: string; category?: string; status?: string}): Todo[] {
    let filteredTodos = todos;

    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
    }

    if (filters.body) {
      filters.body = filters.body.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !== -1);
    }

    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }

    if (filters.status) {
      filters.status = filters.status.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.status.toLowerCase().indexOf(filters.status) !== -1);
    }

    return filteredTodos;
  }

  addTodo(newTodo: Todo): Observable<string> {
    // Send post request to add a new todo with the todo data as the body.
    return this.httpClient.post<{id: string}>(this.todoUrl, newTodo).pipe(map(res => res.id));
  }
}
