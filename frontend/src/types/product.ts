export interface Product {
  idProduct: string;
  name: string;
  description?: string;
  price: number;
  idCategory: string;
  stockQuantity: number;
}

export interface Category {
  id: string;
  name: string;
}