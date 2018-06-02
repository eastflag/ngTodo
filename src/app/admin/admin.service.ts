import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResultVO} from "../domain/result.vo";
import {Observable} from "rxjs/internal/Observable";

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
}
