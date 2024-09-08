// src/controllers.ts

import { Elysia } from 'elysia';
import { Product, Cart, CartItem, Order } from './models';

let products: Product[] = [];
let carts: Cart[] = [];
let orders: Order[] = [];

// Product controllers (existing)
export const getProducts = (ctx: Elysia.Context) => {
  return products;
};

export const getProductById = (ctx: Elysia.Context) => {
  const { id } = ctx.params;
  return products.find(product => product.id === id);
};

export const createProduct = (ctx: Elysia.Context) => {
  const product: Product = ctx.body;
  products.push(product);
  return product;
};

export const updateProduct = (ctx: Elysia.Context) => {
  const { id } = ctx.params;
  const updatedProduct: Product = ctx.body;
  products = products.map(product => (product.id === id ? updatedProduct : product));
  return updatedProduct;
};

export const deleteProduct = (ctx: Elysia.Context) => {
  const { id } = ctx.params;
  products = products.filter(product => product.id !== id);
  return { message: 'Product deleted' };
};

// Cart controllers
export const createCart = (ctx: Elysia.Context) => {
  const cart: Cart = { id: Date.now().toString(), items: [] };
  carts.push(cart);
  return cart;
};

export const addToCart = (ctx: Elysia.Context) => {
  const { cartId } = ctx.params;
  const cartItem: CartItem = ctx.body;
  const cart = carts.find(cart => cart.id === cartId);
  if (cart) {
    const existingItem = cart.items.find(item => item.productId === cartItem.productId);
    if (existingItem) {
      existingItem.quantity += cartItem.quantity;
    } else {
      cart.items.push(cartItem);
    }
    return cart;
  }
  return { message: 'Cart not found' };
};

// Checkout and payment controllers
export const checkout = (ctx: Elysia.Context) => {
  const { cartId } = ctx.params;
  const cart = carts.find(cart => cart.id === cartId);
  if (cart) {
    const totalAmount = cart.items.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);

    const order: Order = {
      id: Date.now().toString(),
      cartId,
      totalAmount,
      status: 'pending',
    };

    // Simulate payment processing
    const paymentSuccessful = Math.random() > 0.5; // Mock payment gateway
    order.status = paymentSuccessful ? 'completed' : 'failed';

    orders.push(order);
    return order;
  }
  return { message: 'Cart not found' };
};