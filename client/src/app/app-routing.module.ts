import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';
import { TodoProfileComponent } from './todos/todo-profile/todo-profile.component';
import { AddTodoComponent } from './todos/add-todo/add-todo.component';


const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'users', component: UserListComponent, title: 'Users'},
  {path: 'users/:id', component: UserProfileComponent, title: 'User Profile'},
  {path: 'todos', component: TodoListComponent, title: 'Todos'},
  {path: 'todos/:id', component: TodoProfileComponent, title: 'Todo Profile'},
  {path: 'todos/new', component: AddTodoComponent, title: 'New Todo'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
