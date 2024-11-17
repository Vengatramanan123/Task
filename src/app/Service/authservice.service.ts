import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from '../enviromnents/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private baseurl = environment.api_url; 

  constructor(private http: HttpClient) { }

  get(relativeUrl: string): Observable<any> {
    return this.http.get<any>(`${this.baseurl}${relativeUrl}`);
  }
  getdata(url:any , id: any) : Observable<any>{
    return this.http.get<any>(`${this.baseurl}${url}`);
  }

  post(url: string, data: any) {
    debugger
    return this.http.post(`${this.baseurl}${url}`, data);  
  }
}
