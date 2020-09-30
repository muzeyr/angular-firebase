import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-firebase';
  todos: Observable<any[]>;
  tutorials: Observable<any[]>;

  constructor(db: AngularFireDatabase){
    /*
      db.list('/todos').subscribe(todos => {
        this.todos = todos;
        console.log(this.todos);
      });
      */
      this.todos = db.list('/todos').valueChanges();
      console.log(this.todos);
      const tutRef = db.object('todos');
      tutRef.set({ title: 'test22'});

      const tutorialsRef = db.list('tutorials');
      tutorialsRef.push({ title: 'MUHAMMED ÖZCAN', url: 'zcntech.com' });
      
      this.tutorials = db.list('/tutorials').valueChanges();
      console.log(this.tutorials);


  }
}
