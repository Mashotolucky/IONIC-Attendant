import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  timeLeft: number = 2;
  interval;

  constructor(private routing:Router) { }

  ngOnInit() {
    this.startTimer();
  }


  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        console.log(this.timeLeft);
        
      } else {
        this.routing.navigate(['/register'])
      }
    },1000)
  }
}
