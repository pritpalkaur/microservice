import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dataUrl = 'assets/data.json'; // This is the URL for your JSON file

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataUrl);
  }

  addProduct(product: Product): Observable<Product> {
    // In a real application, this would be a POST request to your API
    // return this.http.post<Product>(`${this.apiUrl}/AddProduct`, product);
    product.productId = new Date().getTime(); // Temporary ID for the new product
    return new Observable(observer => {
      observer.next(product); 
      observer.complete();
    });
  }

  updateProduct(product: Product): Observable<Product> {
    // In a real application, this would be a PUT request to your API
    return new Observable(observer => {
      observer.next(product);
      observer.complete();
    });
  }

  deleteProduct(productId: number): Observable<void> {
    // In a real application, this would be a DELETE request to your API
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }
}
