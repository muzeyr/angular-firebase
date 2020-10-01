import { TodoService } from './../../services/todo-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import Todo from 'src/app/models/Todo';
import { map } from 'rxjs/operators'; 
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {

  todos: any;
  currentTodo = null;
  currentIndex = -1;
  title = '';
  isCollapsed:false;

  itemsRef: AngularFireList<any>;
  items: Observable<Todo[]>;

  constructor(private todoService: TodoService,private store: Store<AppState>) { 
    this.todoService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.todos = data;
    });
  }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.currentTodo = null;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.todoService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.todos = data;
    });

  }

  setActiveTutorial(todo, index): void {
    this.currentTodo = todo;
    console.log(todo);
    this.currentIndex = index;
    this.store.dispatch({
      type: 'SELECT_TODO',
      payload: <Todo> {
        title: todo.title,
        description: todo.description,
        key: todo.key,
        published: todo.published,
        status: todo.status
      }
    });

  }

  removeAllTutorials(): void {
    this.todoService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  removeTodo(todo):void {
    console.log(todo);

    this.todoService.delete(todo.key);

  }
}
