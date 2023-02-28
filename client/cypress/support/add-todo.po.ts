import {Todo} from 'src/app/todos/todo';

export class AddTodoPage {
  navigateTo() {
    return cy.visit('/todos/new');
  }

  getTitle() {
    return cy.get('.add-todo-title');
  }

  addTodoButton() {
    return cy.get('[data-test=confirmAddTodoButton]');
  }

  selectMatSelectValue(value: string) {
    // Find and click the drop down
    cy.get(`mat-select`).as(`selectorThing`).click();
      // Select and click the desired value from the resulting menu
      cy.get(`mat-option[value="${value}"]`).click();
  }

  getFormField(fieldOwner: string) {
    return cy.get(`mat-form-field [formControlName=${fieldOwner}]`);
  }

  getSnackBar() {
    return cy.get('.mat-mdc-simple-snack-bar');
  }

  addTodo(newTodo: Todo) {
    if (newTodo.owner){
      this.getFormField('owner').type(newTodo.owner);
    }
    this.getFormField('category').type(newTodo.category);
    if (newTodo.body) {
      this.getFormField('body').type(newTodo.body);
    }
    this.selectMatSelectValue(newTodo.status);
    return this.addTodoButton().click();
  }
}
