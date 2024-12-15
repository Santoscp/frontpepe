import {Empresa} from "./Empresa";

export interface Producto{
  id?: number
  nombre: string
  precio: number
  descripcion: string
  imagen: any
  tipo: string
  idEmpresa:Empresa,/*
  idempresa?: number*/
}
