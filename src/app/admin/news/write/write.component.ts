import { Component, OnInit } from '@angular/core';
import {NewsVO} from "../../../domain/news.vo";
import {AdminService} from "../../admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  news = new NewsVO();

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
  }

  addNews() {
    this.adminService.addNews(this.news)
      .subscribe(body => {
        console.log(body);
        this.router.navigate(['admin', 'news']);
        // 부모에게 데이터 갱신을 알린다.
        this.adminService.refresh.next(true);
      });
  }

  fileChange(event: any) {
    console.log(event);

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      // formData API를 이용하여 파일업로드
      const formData = new FormData();
      console.log('file:', reader.result, event.target.files[0].name);
      formData.append('file', event.target.files[0], event.target.files[0].name);
      // 서버에 formData 전송
      this.adminService.imageUpload(formData)
        .subscribe(body => {
          console.log(body);

          if (body['result'] === 0) {
            // 이미지 경로를  editor에 추가한다.
            if (this.news.content) {
              this.news.content += `<img src="http://www.javabrain.kr${body['value']}" style="max-width: 100%;">`;
            } else {
              this.news.content = `<img src="http://www.javabrain.kr${body['value']}" style="max-width: 100%;">`;
            }
          }
        });
    };
  }
}
