import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];
  public limit: number;

  public todoID: string;
  public todoBody: string;
  public todoStatus: string;
  public todoOwner: string;
  public todoCategory: string;
  public viewType: 'card' | 'list' = 'card';
  public orderBy: 'asc'| 'desc' = 'asc';
  public sortBy: 'owner' | 'body' | 'category' | 'status' = 'owner';

  constructor(private todoService: TodoService, private snackBar: MatSnackBar){

  }

  getTodosFromServer() {
    this.todoService.getTodos({
      owner: this.todoOwner,
      status: this.todoStatus,
      orderBy: this.orderBy,
      sortBy: this.sortBy
     // limit: this.limit
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      console.error('We couldn\'t get the list of todos; the server might be down :(');
      this.snackBar.open(
        'Problem contacting server – try again',
        'OK',
        { duration: 3000 });
    });
  }

  public updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { body: this.todoBody, category: this.todoCategory, limit: this.limit}
    );
  }

  public switchOrderBy(){
    if (this.orderBy === 'asc'){
      this.orderBy = 'desc';
    } else {
      this.orderBy = 'asc';
    }
    this.getTodosFromServer();
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }
}
