import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {EmpresaService} from "../../core/services/empresa.service";
import {Empresa} from "../../core/model/Empresa";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {APIResponseModel} from "../../core/model/Model";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
//Este es el componente de inicio de sesión de la aplicación
export class HomeComponent implements OnInit{

  companiesList: Empresa [] = [];
  destroyRef = inject(DestroyRef)
  /*companies;*/

  constructor(private companyService: EmpresaService) { }

  //obtener las empresas del backend
  ngOnInit(): void {
    this.companyService.getCompanies().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res: APIResponseModel)=>{
      console.log(res)
      this.companiesList =  res as any;
    })
  }
/*
  selectCompany(idEmpresa: number) {
    this.companyService.selectCompany(idEmpresa);
    console.log(idEmpresa)
  }*/
}
