import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  addTodoForm: UntypedFormGroup;

  todo: Todo;

    // not sure if this owner is magical and making it be found or if I'm missing something,
  // but this is where the red text that shows up (when there is invalid input) comes from
  addTodoValidationMessages = {
    owner: [
      {type: 'required', message: 'Owner is required'},
      {type: 'minlength', message: 'Owner must be at least 2 characters long'},
      {type: 'maxlength', message: 'Owner cannot be more than 50 characters long'},
    ],

    category: [
      {type: 'required', message: 'Category is required'},
      {type: 'minlength', message: 'Category must be at least 2 characters long'},
      {type: 'maxlength', message: 'Category cannot be more than 50 characters long'},
    ],
    status: [
      {type: 'required', message: 'Status is required'},
      { type: 'pattern', message: 'Status must be either complete, or incomplete' }
    ],

    body: [
      {type: 'maxlength', message: 'Body  cannot be more than 300 characters long'}
    ],
  };

  constructor(private fb: UntypedFormBuilder, private todoService: TodoService, private snackBar: MatSnackBar, private router: Router) {
  }

  createForms() {

    // add todo form validations
    this.addTodoForm = this.fb.group({
      // We allow alphanumeric input and limit the length for owner.
      owner: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ])),

      category: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ])),

      body: new UntypedFormControl('', Validators.compose([
        Validators.maxLength(300),
      ])),


      status: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(complete|incomplete)$')
      ])),
    });

  }

  ngOnInit() {
    this.createForms();
  }


  submitForm() {
    // eslint-disable-next-line prefer-const
    let todo = this.addTodoForm.value;
    if (todo.status === 'incomplete'){
      todo.status = 'false';
    }
    else {todo.status = 'true';}

    this.todoService.addTodo(this.addTodoForm.value).subscribe({
      next: (newID) => {
        this.snackBar.open(
          `Added todo ${this.addTodoForm.value.owner}`,
          null,
          { duration: 2000 }
        );
        this.router.navigate(['/todos/', newID]);
      },
      error: err => {
        this.snackBar.open(
          'Failed to add the todo',
          'OK',
          { duration: 5000 }
        );
      },
      // complete: () => console.log('Add todo completes!')
    });
  }

}

