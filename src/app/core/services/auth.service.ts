import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Empresa} from "../model/Empresa";
import {Login_Request} from "../model/DTO/Login_Request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Este es el servicio de autenticación que se encarga de manejar la autenticación del usuario conectandose con la api
  // y tambien manejar el estado de autenticación logeandose y deslogeandose

  private apiUrl: string = environment.endpoint+"/"+environment.apiAuth;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  public admin: Login_Request={
    username: '',
    password: '',
    dni: ''
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string, dni: string): Observable<any> {
    this.isLoggedInSubject.next(true);
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password, dni });
  }

  logout() {
    this.isLoggedInSubject.next(false);
  }
}
