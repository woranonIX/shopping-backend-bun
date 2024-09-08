// src/models.ts

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
  }
  
  export interface CartItem {
    productId: string;
    quantity: number;
  }
  
  export interface Cart {
    id: string;
    items: CartItem[];
  }
  
  export interface Order {
    id: string;
    cartId: string;
    totalAmount: number;
    status: 'pending' | 'completed' | 'failed';
  }