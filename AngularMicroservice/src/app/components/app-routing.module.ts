import { CategoryModule } from './category/category.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard'; // Import the AuthGuard
const routes: Routes = [
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) }, // Protect product route },
  { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) }, // Protect product route },
  { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) }, // Protect product route },
  { path: 'movies', loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule) }, // Protect product route },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
