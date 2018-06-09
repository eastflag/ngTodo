import { Component, OnInit } from '@angular/core';
import {NewsVO} from "../../../domain/news.vo";

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  news = new NewsVO();

  constructor() { }

  ngOnInit() {
  }

  addNews() {

  }
}
