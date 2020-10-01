import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import Todo from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private dbPath = '/todos';
  tutorialsRef: AngularFireList<Todo> = null;

  
  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Todo> {
    return this.tutorialsRef;
  }

  create(todo: Todo): any {
    return this.tutorialsRef.push(todo);
  }

  update(key: string, value: any): Promise<void> {
    return this.tutorialsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.tutorialsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.tutorialsRef.remove();
  }

}
