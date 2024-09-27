// product.model.ts
// product.model.ts
export interface Product {
  productId: number;
  productName: string;
  productDescription: string; // Note the typo here; should be "productDescription"
  price?: number; // Optional if price is not always included
}
// export interface Product {
//     productId: number;
//     productName: string;
//     prouctDescription: string;
//   }
  