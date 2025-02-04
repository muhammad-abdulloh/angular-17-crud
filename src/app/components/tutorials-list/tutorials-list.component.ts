import { Component, Input, OnInit } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrl: './tutorials-list.component.css'
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  name = '';

  constructor(private tutorialService: TutorialService){}

  ngOnInit(): void {

    this.retrieveTutorials();
  }

  retrieveTutorials(): void{
    this.tutorialService.getAll()
    .subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (err) => console.log(err)
    })
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number) : void {
    this.currentTutorial = tutorial;
    this.currentIndex = index
  }

  removeAllTutorials(): void{
    this.tutorialService.deleteAll()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (err) => console.log(err)
    })
  }


  searchName(): void {
    this.currentTutorial = {}
    this.currentIndex = -1

    this.tutorialService.findByName(this.name)
    .subscribe({
      next: (data) => {
        this.tutorials = data
        console.log(data);
      },
      error: (err) => console.log(err)
    });
  }

}
