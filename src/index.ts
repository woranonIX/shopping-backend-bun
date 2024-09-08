import { Elysia } from 'elysia';
import { routes } from './routes';

const app = new Elysia();

app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});