import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSelectComponent } from './components/user-select/user-select.component';


@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-user-select></app-user-select>
  `,
  imports: [RouterOutlet,UserSelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'twitter-clone';
}
