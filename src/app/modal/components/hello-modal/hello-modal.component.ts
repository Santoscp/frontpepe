import { Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Producto } from '../../../core/model/Producto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prodcut_Request_Update } from '../../../core/model/DTO/Product_Request_Update';

@Component({
  selector: 'app-hello-modal',
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule
  ],
  templateUrl: './hello-modal.component.html',
  styleUrls: ['./hello-modal.component.css']
})
export class HelloModalComponent {
  @ViewChild('f') f!: NgForm;
  @Output() productUpdated = new EventEmitter<any>();
  imageSelected: boolean = false;  // Variable para verificar si la imagen ha sido seleccionada
  selectedImage: File | null = null;

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<HelloModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Cargar los datos del producto en el formulario
  ngAfterViewInit() {
    setTimeout(() => {
      // Pre-cargar los datos del producto en el formulario
      this.f.setValue({
        nombre: this.data.product?.nombre,
        precio: this.data.product?.precio
      });
    });
  }

  // Cerrar el modal
  closeModal(): void {
    this.dialogRef.close();
  }

  // Actualizar el producto
  onSubmit(f: NgForm): void {
    if (!f.valid) return;

    const { nombre, precio } = f.value;
    const productoId = this.data.product.id;

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('id', productoId.toString());

    // Si se ha seleccionado una nueva imagen, agregarla a los datos
    if (this.selectedImage) {
      formData.append('imagen', this.selectedImage, this.selectedImage.name);
    }

    // Llamar al servicio para actualizar el producto
    this.productService.updateProductWithImage(productoId, formData).subscribe(
      (updatedProduct: any) => {
        console.log('Producto actualizado en el servidor:', updatedProduct);

        // Emitir el producto actualizado
        this.productUpdated.emit(updatedProduct);
        this.closeModal();
      },
      (error: any) => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

  // Manejar la selección de una imagen
  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.imageSelected = true;
    } else {
      this.selectedImage = null;
      this.imageSelected = false;
    }
  }
  
}
