import express from 'express';
import { ProductManager } from './ProductManager.js';
import { CartManager } from './CartManager.js';
import routerCarts from '../routes/carts.router.js';
import routerProducts from '../routes/products.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const pathProducts = './src/data/products.json';
const pathCarts = './src/data/carts.json';

export const productManager = new ProductManager(pathProducts);
export const cartManager = new CartManager(pathCarts);

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

app.listen(PORT, () => console.log(`Servidor con express, en el puerto ${PORT}`));