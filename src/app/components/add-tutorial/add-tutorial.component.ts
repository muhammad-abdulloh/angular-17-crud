import { Component } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrl: './add-tutorial.component.css'
})
export class AddTutorialComponent {
  tutorial: Tutorial = {
    name: '',
    email: '',
    password: '',
    login: '',
    role: ''
  }

  submitted: boolean = false;

  constructor(private tutorialService: TutorialService){  }

  saveTutorial(): void{
    const data = {
      name : this.tutorial.name,
      email : this.tutorial.email,
      password : this.tutorial.password,
      login : this.tutorial.login,
      role : this.tutorial.role,
    }

    this.tutorialService.create(data)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      name: '',
      email: '',
      password: '',
      login: '',
      role: ''
    }
  }
}
