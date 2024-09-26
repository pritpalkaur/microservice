import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { InventoryComponent } from './inventory.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: InventoryComponent }
];

@NgModule({
  declarations: [InventoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class InventoryModule { }
