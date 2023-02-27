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
        // In the real world you'd want to be very careful about having
        // an upper limit like this because people can sometimes have
        // very long owners. This demonstrates that it's possible, though,
        // to have maximum length limits.
        Validators.maxLength(50),
      ])),

      category: new UntypedFormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        // In the real world you'd want to be very careful about having
        // an upper limit like this because people can sometimes have
        // very long categories. This demonstrates that it's possible, though,
        // to have maximum length limits.
        Validators.maxLength(50),
      ])),

      body: new UntypedFormControl('', Validators.compose([
        Validators.maxLength(300),
      ])),

      // We don't care much about what is in the company field, so we just add it here as part of the form
      // without any particular validation.
      status: new UntypedFormControl(),
    });

  }

  ngOnInit() {
    this.createForms();
  }


  submitForm() {
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

