import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor} from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FormsModule,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  
  title = 'todo-app';
  tasks: { text: string; completed: boolean }[] = [];
  newTask: string = '';

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ text: this.newTask, completed: false });
      this.newTask = '';  // Clear input field
    }
  }

  toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

}
