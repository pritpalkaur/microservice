import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['productId', 'productName', 'prouctDescription', 'actions'];
  dataSource: Product[] = [];

  // Properties for creating and editing products
  newProduct: Product = { productId: 0, productName: '', prouctDescription: '' };
  isEditing: boolean = false;
  editingProductId: number | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.dataSource = this.products;
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(
      (product: Product) => {
        this.products.push(product);
        this.dataSource = [...this.products];
        this.resetForm();
      },
      error => {
        console.error('Error adding product', error);
      }
    );
  }

  editProduct(product: Product): void {
    this.isEditing = true;
    this.editingProductId = product.productId;
    this.newProduct = { ...product };
  }

  updateProduct(): void {
    if (this.editingProductId !== null) {
      this.productService.updateProduct(this.newProduct).subscribe(
        (updatedProduct: Product) => {
          const index = this.products.findIndex(p => p.productId === this.editingProductId);
          if (index !== -1) {
            this.products[index] = updatedProduct;
            this.dataSource = [...this.products];
          }
          this.resetForm();
        },
        error => {
          console.error('Error updating product', error);
        }
      );
    }
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.products = this.products.filter(p => p.productId !== productId);
        this.dataSource = [...this.products];
      },
      error => {
        console.error('Error deleting product', error);
      }
    );
  }

  resetForm(): void {
    this.newProduct = { productId: 0, productName: '', prouctDescription: '' };
    this.isEditing = false;
    this.editingProductId = null;
  }
}





// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../services/product.service';
// import { Product } from '../../models/product.model'; // Assuming you have a Product model

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.css']
// })
// export class ProductComponent implements OnInit {
//   products: Product[] = [];
//   displayedColumns: string[] = ['productId', 'productName', 'prouctDescription'];
//   dataSource: Product[] = [];

//   // Properties for creating and editing products
//   newProduct: Product = { productId: 0, productName: '', productCat: '' };
//   isEditing: boolean = false;
//   editingProductId: number | null = null;

//   constructor(private productService: ProductService) { }

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   loadProducts(): void {
//     this.productService.getProducts().subscribe(
//       (data: Product[]) => {
//         this.products = data;
//         this.dataSource = this.products;
//       },
//       error => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }
// }