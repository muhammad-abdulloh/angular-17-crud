import { Component, Input, OnInit } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrl: './tutorial-details.component.css'
})
export class TutorialDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentTutorial: Tutorial = {
    name: '',
    email: '',
    password: '',
    login: '',
    role: ''
  };
  
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params["id"]);
    }
  }

  getTutorial(id: number): void {
    this.tutorialService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTutorial = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentTutorial.name,
      email: this.currentTutorial.email,
      password: this.currentTutorial.password,
      login: this.currentTutorial.login,
      role: this.currentTutorial.role
    };

    this.message = '';

    this.tutorialService.update(<number>this.currentTutorial.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.currentTutorial.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateTutorial(): void {
    this.message = '';

    this.tutorialService.update(<number>this.currentTutorial.id, this.currentTutorial)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This tutorial was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(<number>this.currentTutorial.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutorials']);
        },
        error: (e) => console.error(e)
      });
  }


}
