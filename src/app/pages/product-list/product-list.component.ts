import { HttpClientModule } from '@angular/common/http';
import {Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { APIResponseModel} from '../../core/model/Model';
import { LazyImageDirective } from '../../shared/directive/lazy-image.directive';
import { AsyncPipe, CommonModule } from '@angular/common';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Producto} from "../../core/model/Producto";
import {FormsModule, NgForm} from "@angular/forms";
import {EmpresaService} from "../../core/services/empresa.service";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [HttpClientModule, LazyImageDirective, CommonModule, AsyncPipe, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
//Este es el componente de la lista de productos de la empresa actual
export class ProductListComponent implements OnInit{
  imageSelected: boolean = false;  // Variable para verificar si la imagen ha sido seleccionada
  selectedImage: File | null = null;
  idEmpresa:any


productList: Producto [] = [];

productService = inject(ProductService);
destroyRef = inject(DestroyRef)


  constructor(private companyService: EmpresaService) {
  }

  //Esto es para obtener los productos de la empresa actual
  ngOnInit(): void {
    this.companyService.selectCompany(this.companyService.idEmpresa.id);
    this.companyService.getCompanyId();
  
    if (!this.companyService.idEmpresa) {
      return alert("No hay id de empresa");
    }
  
    this.productService.getProductByCompanyId(this.companyService.idEmpresa.id).subscribe(
      (res: any) => {
        console.log('Respuesta completa de la API:', res); // Muestra la respuesta completa
        if (res && Array.isArray(res)) {
          this.productList = res;  // Si la respuesta es un array, asigna directamente a productList
          console.log('Lista de productos:', this.productList);
          this.productList.forEach((product: any) => {
            console.log('Producto:', product);
            console.log('Imagen:', product.imagen);  // Verifica si la imagen existe para cada producto
          });
        } else if (res && res.data && Array.isArray(res.data)) {
          this.productList = res.data; // Si la respuesta tiene una propiedad "data" que es un array, asigna a productList
          console.log('Lista de productos:', this.productList);
        } else {
          console.error('La respuesta no tiene la propiedad "data" o no es un array');
        }
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }
  
  
  

getProductsByType(type: string) {
  this.productService.getProductByType(type).subscribe((res: APIResponseModel)=>{
    this.productList =  res.data;
  },error=> {
    alert("Error From API product type")
  })
}

//Esto es para crear un producto en la empresa actual
crearProducto(form: NgForm) {
  if (!this.selectedImage) {
    console.log('Imagen no seleccionada');
    return;  // No continuar si no se ha seleccionado una imagen
  }

  // Obtener los valores del formulario
  const nombre = form.value.nombre;
  const descripcion = form.value.descripcion;
  const precio = form.value.precio;
  const tipo = form.value.tipo;
  const imagen = this.selectedImage; 
  const id_empresa = this.companyService.idEmpresa?.id;  // Accede al idEmpresa directamente desde el servicio
  
  // Verificar que id_empresa esté presente y sea válido
  if (!id_empresa) {
    console.error('id_empresa es inválido o no está definido');
    return;  // No continuar si no hay un id_empresa válido
  }

  // Llamar al servicio para guardar el producto con todos los datos
  this.productService.guardarProductoConImagen(nombre, descripcion, precio, tipo, imagen, id_empresa).subscribe(
    (response) => {
      console.log('Producto guardado exitosamente', response);
      // Puedes añadir aquí la lógica adicional que necesites, como limpiar el formulario o mostrar un mensaje de éxito
    },
    (error) => {
      console.error('Error al guardar el producto', error);
      // Manejo de errores, como mostrar un mensaje de error al usuario
    }
  );
}

  
  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.imageSelected = true;  // La imagen ha sido seleccionada
    } else {
      this.selectedImage = null;
      this.imageSelected = false;  // No se seleccionó ninguna imagen
    }
  }

}
