import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/Model';
import {environment} from "../../../environments/environment";
import {Prodcut_Request_Update} from "../model/DTO/Product_Request_Update";
import {Producto} from "../model/Producto";
import {EmpresaService} from "./empresa.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //Este es el servicio de productos que se encarga de hacer las peticiones a la base de datos

  apiUrl: string = environment.endpoint+"/"+environment.apiProduct;

  constructor(private http: HttpClient, private companyService: EmpresaService) { }

  getProductByName(name: string): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}/name/${name}`);
  }

  //metodo para obtener todos los productos del id de la empresa
  getProductsByNameAndCompanyId(nombre: string, id_empresa: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/company/${id_empresa}/nombre/${nombre}`);
  }

  //metodo para obtener todos los productos
  getAllProduct(): Observable<APIResponseModel> {
    console.log(this.apiUrl)
    return this.http.get<APIResponseModel>(`${this.apiUrl}`);
  }
  //metodo para obtener todos los productos del id de la empresa

  getProductByCompanyId(id: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}/companies/${id}`);
  }

  //metodo para obtener un producto por su id
  getProductById(id: number): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}GetProductById/${id}`);
  }

  //metodo para obtener un producto por su clasificacion
  getProductByType(type: string): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}GetProductByType/${type}`);
  }

  //metodo para actualizar un producto
  updateProduct(obj: Prodcut_Request_Update): Observable<APIResponseModel> {
    console.log("SERVICOI")
    console.log(obj)
    return this.http.put<APIResponseModel>(`${this.apiUrl}/edit`, obj);
  }

  //metodo para eliminar un producto
  deleteProductById(id: number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(`${this.apiUrl}/delete/${id}`);
  }

  //metodo para agregar un producto
  addProduct(producto: Producto): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(`${this.apiUrl}/addProduct`, producto);
  }
  guardarProductoConImagen(nombre: string, descripcion: string, precio: number, tipo: string, imagen: File, idEmpresa: number): Observable<APIResponseModel> {
    const formData: FormData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);  // Agregar la descripción al FormData
    formData.append('precio', precio.toString());  // Convertir precio a string
    formData.append('tipo', tipo);  // Agregar el tipo al FormData
    formData.append('imagen', imagen, imagen.name);  // Aquí se agrega la imagen al FormData
    formData.append('idEmpresa', idEmpresa.toString()); // Convertir idEmpresa a string, asegurándose que sea un número
  
    // Enviar la solicitud POST al backend
    return this.http.post<APIResponseModel>(`${this.apiUrl}/guardar`, formData);
  }
  
  

  onRegister (obj: any): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(`${this.apiUrl}RegisterCustomer`, obj);
  }

  onLogin (obj: any): Observable<APIResponseModel>{
    return this.http.post<APIResponseModel>(`${this.apiUrl}login`, obj);
  }
  updateProductWithImage(productoId: number, formData: FormData): Observable<APIResponseModel> {
    const url = `${this.apiUrl}/editProductWithImage/${productoId}`;
    return this.http.put<APIResponseModel>(url, formData);
  }
  


}
