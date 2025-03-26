import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NameValidator } from './nameValidator';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,CommonModule,  ReactiveFormsModule],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  jobForm: FormGroup;

  constructor(private fb: FormBuilder, private nameValidator: NameValidator) {
    this.jobForm = this.fb.group({
      fullName: ['', [Validators.required], [this.nameValidator.checkNameExists()]],
      email: ['', [Validators.required, Validators.email]],
      isMarried: [false], 
      skills: this.fb.array([]) // This will store dynamic skills
    });
  }
  get skills() {
    return this.jobForm.get('skills') as FormArray;
  }
  
  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }
  
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }
  
onSubmit() {
  if (this.jobForm.valid) {
    console.log('Form Submitted:', this.jobForm.value);
    this.jobForm.reset();
  } else {
    console.log('Form is invalid');
  }
}
showAdditionalInfo = false;

  toggleAdditionalInfo() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
  }
  }
 

