import { HttpClient } from '@angular/common/http';
import { Injectable, ɵallowSanitizationBypassAndThrow } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'https://localhost:44396/api/Users/';


@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}GetAllUsers`);
  }

  get(id: number) : Observable<any> {
    return this.http.get<any>(`${baseUrl}UserGetById?id=${id}`)
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}CreateUser`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}UpdateUser?id=${id}`, data);
  }

  delete(id: number) : Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}DeleteUserById?id=${id}`)
  }


  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name: string): Observable<any> {
    return this.http.get(`${baseUrl}FindByName?name=${name}`)
  }

}
