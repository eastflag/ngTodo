import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events
      .subscribe(event => {
        console.log(event);
        if (event instanceof NavigationEnd) {
          // 상단으로 스크롤
          window.scrollTo(0, 0);
        }
      });
  }
}
