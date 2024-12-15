
import {Component, DestroyRef, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../core/services/product.service";
import {FormsModule} from "@angular/forms";
import {Producto} from "../../core/model/Producto";
import {AsyncPipe, NgForOf} from "@angular/common";
import {ModalService} from "../../modal/modal.service";
import {HelloModalComponent} from "../../modal/components/hello-modal/hello-modal.component";
import {debounce, fromEvent, debounceTime, Observable, mergeMap, tap, catchError, map, of, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {EmpresaService} from "../../core/services/empresa.service";
@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    AsyncPipe
  ],
  styleUrls: ['./editproducts.component.css']
})
export class EditproductsComponent  {

  //Este es el componente que se encarga de editar los productos de la empresa
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  $search:Observable<any[]> = of([]);
  errorMessage: string = '';
  productList: any[] = [];

  constructor(private productService: ProductService,
              private empresaService: EmpresaService,
              private modalService: ModalService,
              private  destroyRef?: DestroyRef) { }

  //Metodo para buscar productos de la empresa por su nombre y id
  ngAfterViewInit(): void {
    this.$search = fromEvent(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(500),
      mergeMap(() => {
        const searchTerm = this.searchInput.nativeElement.value.trim();
        if (searchTerm === '') {
          return of([]);
        }
        return this.productService.getProductsByNameAndCompanyId(searchTerm, this.empresaService.idEmpresa.id);
      }),
      map((res: any) => {
        if (!res || res.length === 0) {
          this.errorMessage = 'No se encontraron productos.';
          return [];
        } else {
          this.errorMessage = ''; // Limpiar mensaje de error si se encuentran productos
          return Array.isArray(res) ? res : [res];
        }
      }),
      catchError((err) => {
        console.error(err);
        this.errorMessage = 'Ocurrió un error durante la búsqueda.';
        return of([]);
      }),
      tap((res) => console.log(res))
    ) as any;
  }

  // Método para editar un producto
  editProduct(product: any): void {
    const modalRef = this.modalService.openDialog(HelloModalComponent, {
      product: product,
    });

    // Escuchar el evento del producto actualizado
    modalRef.componentInstance.productUpdated.subscribe((updatedProduct: any) => {
      console.log('Producto actualizado:', updatedProduct);

      // Actualizar la lista de productos con los datos actualizados
      const index = this.productList.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        this.productList[index] = updatedProduct;
      }
    });
  }

  // Metodo para eliminar un producto
  deleteProduct(product: Producto): void {
    if (product.id !== undefined) {
      this.productService.deleteProductById(product.id).subscribe(response => {
        console.log('Producto eliminado exitosamente');
        // Puedes realizar más acciones después de eliminar el producto
      }, error => {
        console.error('Error al eliminar el producto:', error);
      });
    } else {
      console.error('El identificador del producto es undefined');
    }
  }
}
