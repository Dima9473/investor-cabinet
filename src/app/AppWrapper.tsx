import { createBrowserRouter, RouterProvider } from 'react-router';

import { QueryClientProvider } from './providers/QueryClientProvider';
import AppRoutes from './routes';

const baseUrl = import.meta.env.BASE_URL;
const basename = baseUrl === '/' ? undefined : baseUrl.replace(/\/$/, '');
const router = createBrowserRouter(AppRoutes, { basename });

function AppWrapper() {
  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default AppWrapper;
