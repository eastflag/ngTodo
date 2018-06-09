import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../admin.service";
import {NewsVO} from "../../../domain/news.vo";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  news: NewsVO;

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    console.log('view init:', this.router.url);

    // news_id를 어떻게 얻어낼까?
    this.route.params
      .subscribe(params => {
        console.log(params);
        const news_id = +params['news_id']; // +는 스트링을 숫자로 변환
        this.findOneNews(news_id);
      });

  }

  findOneNews(news_id: number) {
    this.adminService.findOneNews(news_id)
      .subscribe(body => {
        console.log(body);
        this.news = body;
      });
  }
}
