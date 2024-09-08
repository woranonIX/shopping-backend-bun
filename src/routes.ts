// src/routes.ts

import { Elysia } from 'elysia';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createCart,
  addToCart,
  checkout,
} from './controllers';

export const routes = (app: Elysia) => {
  // Product routes
  app.get('/products', getProducts);
  app.get('/products/:id', getProductById);
  app.post('/products', createProduct);
  app.put('/products/:id', updateProduct);
  app.delete('/products/:id', deleteProduct);

  // Cart routes
  app.post('/carts', createCart);
  app.post('/carts/:cartId/items', addToCart);

  // Checkout route
  app.post('/checkout/:cartId', checkout);
};