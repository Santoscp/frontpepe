import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {APIResponseModel} from "../model/Model";
import {Company_Request_Update} from "../model/DTO/Company_Request_Update";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Empresa} from "../model/Empresa";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  //Este es el servicio de la empresa que se encarga de manejar peticiones sobre una empresa

  public idEmpresa: Empresa={
    id: 0,
    horario: '',
    direccion: '',
    nombre: '',
    id_admin:0,
    puntuaje: 0,
    img: ''
  };
  apiUrl: string = environment.endpoint+"/"+environment.apiCompany;

  constructor(private http: HttpClient) {this.idEmpresa.id = parseInt(localStorage.getItem('idEmpresa')|| '0'); }

  //obtener todas las empresas
  getCompanies(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}/getall`);
  }

  //seleccionar una empresa
  selectCompany(id_empresa: number) {
    this.idEmpresa.id = id_empresa;
    localStorage.setItem('idEmpresa', JSON.stringify(id_empresa));
    console.log(JSON.stringify(id_empresa))
  }

  //obtener la empresa seleccionada
  getCompanyId() {
    return this.idEmpresa.id;
  }

}

