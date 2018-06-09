import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../admin.service";
import {NewsVO} from "../../../domain/news.vo";
import {MatDialog, MatDialogRef, MatSnackBar} from "@angular/material";
import {ViewDialogComponent} from "../view-dialog/view-dialog.component";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  news: NewsVO;

  constructor(private router: Router, private route: ActivatedRoute, private adminService: AdminService,
              private dialog: MatDialog, private snackBar: MatSnackBar) { }

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

  popupDelete() {
    this.dialog.open(ViewDialogComponent, {data: {content: `${this.news.title} 을 삭제하시겠습니까?` }})
      .afterClosed().subscribe(data => {
      console.log(data);
      if (data) {
        // 데이터 삭제
        this.adminService.removeNews(this.news.news_id)
          .subscribe(body => {
            console.log(body);
            // 뉴스 목록보기로 돌아간다.
            this.router.navigate(['admin', 'news']);
            // 토스트 메시지 보이기
            this.snackBar.open('삭제되었습니다.', null, {duration: 3000});
          });
      }
    });
  }
}
