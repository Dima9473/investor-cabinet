import { createBrowserRouter, RouterProvider } from 'react-router';

import AppRoutes from './routes';

const router = createBrowserRouter(AppRoutes);

function AppWrapper() {
  return <RouterProvider router={router} />;
}

export default AppWrapper;
