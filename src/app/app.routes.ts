import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import {EditproductsComponent} from "./pages/editproducts/editproducts.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {AboutComponent} from "./pages/about/about.component";
import {ContactusComponent} from "./pages/contactus/contactus.component";

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
    },
    {
        path:'products',
        component:ProductListComponent
    },
    {
      path:'editproducts',
      component:EditproductsComponent
    },
    {
      path:'About',
      component:AboutComponent
    },
    {
      path:'ContactUs',
      component:ContactusComponent
    },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'**',
    component:LoginComponent
  },
];
