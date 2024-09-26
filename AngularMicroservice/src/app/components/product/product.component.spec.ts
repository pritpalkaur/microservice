import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { ProductComponent } from './product.component';
import { ProductService } from '../../services/product.service';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  // Test case 1: Check if the component is created
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Verify products are fetched and assigned correctly
  it('should fetch products and set the dataSource', () => {
    const mockProducts = [
      { productId: 1, productName: 'Product 1', productCat: 'Category 1' },
      { productId: 2, productName: 'Product 2', productCat: 'Category 2' },
    ];

    // Mock the getProducts method
    spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));

    // Trigger ngOnInit to fetch products
    component.ngOnInit();

    // Verify the products and dataSource are set correctly
    expect(component.products).toEqual(mockProducts);
    expect(component.dataSource).toEqual(mockProducts);
  });

  // Test case 3: Verify error handling when fetching products
  it('should handle error when fetching products', () => {
    const errorResponse = new ErrorEvent('Network error');

    // Mock the getProducts method to return an error
    spyOn(productService, 'getProducts').and.returnValue(throwError(() => errorResponse));
    spyOn(console, 'error');  // Spy on console.error to verify it is called

    // Trigger ngOnInit to fetch products
    component.ngOnInit();

    // Verify the error handling works
    expect(console.error).toHaveBeenCalledWith('Error fetching products', errorResponse);
  });
});
