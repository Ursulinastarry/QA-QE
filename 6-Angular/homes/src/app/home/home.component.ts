import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor} from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}


@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
    @Input() todo!: Todo;
    @Output() toggleComplete = new EventEmitter<void>();
    
    onToggle(): void {
      this.toggleComplete.emit();
    }
  
}