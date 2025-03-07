import { createBrowserRouter, RouterProvider } from 'react-router';

import { QueryClientProvider } from './providers/QueryClientProvider';
import AppRoutes from './routes';

const router = createBrowserRouter(AppRoutes);

function AppWrapper() {
  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default AppWrapper;
