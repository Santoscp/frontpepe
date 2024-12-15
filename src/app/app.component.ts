import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterOutlet} from '@angular/router';
import { ProductService } from './core/services/product.service';
import {EmpresaService} from "./core/services/empresa.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "./core/services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  empresaId=this.companyService.idEmpresa;
  isLoggedIn = false;

  constructor(private productSr:ProductService, private router:Router,
              private companyService: EmpresaService, public authService: AuthService) {}

  // Suscribirse a los cambios de estado de autenticación
  ngOnInit(): void {
    // Suscribirse a los cambios de estado de autenticación
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  //manejo de navegación entre componentes y sus páginas
  toProducts() {
    this.router.navigate([`products`]);
  }

  toEditProducts() {
    this.router.navigate(['editproducts'])
  }

  toAbout() {
    this.router.navigate(['About'])
  }

  toContactUs() {
    this.router.navigate(['ContactUs'])
  }
}
