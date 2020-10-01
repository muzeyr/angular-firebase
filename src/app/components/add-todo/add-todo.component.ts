import { TodoService } from './../../services/todo-service.service';

import { Component, OnInit } from '@angular/core';
import Todo from 'src/app/models/Todo'; 
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { createSelector, createFeatureSelector, Store } from '@ngrx/store';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.sass']
})
export class AddTodoComponent implements OnInit {

  public form: FormGroup;

  

  constructor(private todoService: TodoService,
              private readonly formBuilder: FormBuilder,
              private store: Store<Todo>) { 
 
      //let todo = store.select('counterReducer', 'counter');

      //console.log(todo);

      this.form = this.formBuilder.group({
          title: new FormControl(''),
        description: new FormControl('')
      });
  }
  todo: Todo = new Todo();
  submitted = false;

  ngOnInit(): void {
  }

  saveTodo(): void {
    console.log(this.todo);
    this.todo.title = this.form.value.title;
    this.todo.description = this.form.value.description;
    this.todoService.create(this.todo).then(() => {
      console.log('Created new todo successfully!');
      this.submitted = true;
      this.newTodo();
    });
  }

  newTodo(): void {
    this.submitted = false;
    this.todo = new Todo();
    this.form.reset();
  }


}
