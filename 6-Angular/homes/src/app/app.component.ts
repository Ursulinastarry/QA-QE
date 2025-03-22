import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent], // <-- Import HomeComponent here
  template: `<app-home></app-home>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];
  newTodoText = '';
  nextId = 1;
  
  get completedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }
  
  addTodo(): void {
    if (this.newTodoText.trim() === '') return;
    
    this.todos.push({
      id: this.nextId++,
      text: this.newTodoText,
      completed: false
    });
    
    this.newTodoText = '';
  }
  
  toggleTodoComplete(todo: Todo): void {
    todo.completed = !todo.completed;
  }
}
