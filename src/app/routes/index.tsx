import { Navigate } from 'react-router';

import {
  ANALYTICS_ROUTE,
  APP_ROUTER,
  KNOWLEDGE_CATALOG_ROUTE,
  OPERATIONS_ROUTE,
  OVERVIEW_ROUTE,
  PORTFOLIO_ROUTE,
} from 'shared/lib/const/routes/fullPaths';
import { Analytics } from 'pages/Analytics';
import { KnowledgeCatalog } from 'pages/KnowledgeCatalog/ui/KnowledgeCatalog';
import { Operations } from 'pages/Operations';
import { Overview } from 'pages/Overview';
import { Portfolio } from 'pages/Portfolio';
import { App } from '../ui/App';
import { MainLayout } from '../ui/MainLayout';

import { Routes } from '../model/types/routes';

const AppRoutes: Routes[] = [
  {
    path: APP_ROUTER,
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate replace to={OVERVIEW_ROUTE} /> },
          { element: <Overview />, path: OVERVIEW_ROUTE.slice(1) },
          { element: <Portfolio />, path: PORTFOLIO_ROUTE.slice(1) },
          { element: <Operations />, path: OPERATIONS_ROUTE.slice(1) },
          { element: <Analytics />, path: ANALYTICS_ROUTE.slice(1) },
          {
            element: <KnowledgeCatalog />,
            path: KNOWLEDGE_CATALOG_ROUTE.slice(1),
          },
          { element: <Navigate replace to={PORTFOLIO_ROUTE} />, path: 'banks' },
          { element: <Navigate replace to={PORTFOLIO_ROUTE} />, path: 'banks/:bankName' },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to={OVERVIEW_ROUTE} />,
  },
];

export default AppRoutes;
