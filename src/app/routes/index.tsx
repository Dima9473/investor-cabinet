import { ProtectedRoute } from 'app/ui/ProtectedRoute';
import { Navigate } from 'react-router';

import { APP_ROUTER } from 'shared/lib/const/routes/fullPaths';
import { APP, AUTH } from 'shared/lib/const/routes/shortPaths';
import { App } from '../ui/App';
import { MainLayout } from '../ui/MainLayout';
import { Redirect } from '../ui/Redirect/Redirect';
import { banksConfig } from './configs/banksConfig';
import { loginConfig } from './configs/loginConfig';

import { Routes } from '../model/types/routes';

const AppRoutes: Routes[] = [
  {
    path: APP_ROUTER,
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <MainLayout />,
        children: [{ index: true, element: <Redirect /> }, banksConfig],
      },
    ],
  },
  {
    path: AUTH,
    children: loginConfig,
  },
  {
    path: '*',
    element: <Navigate to={APP} replace />,
  },
];

export default AppRoutes;
