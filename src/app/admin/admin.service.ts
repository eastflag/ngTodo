import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResultVO} from "../domain/result.vo";
import {Observable} from "rxjs/internal/Observable";
import {NewsVO} from "../domain/news.vo";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private Server: string;
  private header: HttpHeaders;

  constructor(private http: HttpClient) {
    this.Server = environment.HOST;
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
  }

  findNews(page: any): Observable<ResultVO> {
    return this.http.post<ResultVO>(this.Server + '/api/newsList', page, {headers: this.header});
  }

  findOneNews(news_id: number): Observable<NewsVO> {
    return this.http.get<NewsVO>(this.Server + `/api/news?news_id=${news_id}`);
  }

  addNews(news: NewsVO) {
    return this.http.post(this.Server + '/api/news', news, {headers: this.header});
  }

  imageUpload(formData: FormData) {
    return this.http.post(this.Server + '/api/imageUpload', formData);
  }

  removeNews(news_id: number) {
    return this.http.delete(this.Server + `/api/news?news_id=${news_id}`);
  }
}
