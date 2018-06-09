import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('view init:', this.router.url);

    // news_id를 어떻게 얻어낼까?
    this.route.params
      .subscribe(params => {
        console.log(params);
        const news_id = +params['news_id']; // +는 스트링을 숫자로 변환
        this.findNews(news_id);
      });

  }

  findNews(news_id: number) {

  }
}
