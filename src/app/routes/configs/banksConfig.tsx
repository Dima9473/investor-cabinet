import { BankLayout } from 'app/ui/BankLayout';

import { OPERATIONS_ROUTE } from 'shared/lib/const/routes/fullPaths';
import {
  ANALYTICS,
  BANK,
  JOURNAL,
  OPERATIONS,
} from 'shared/lib/const/routes/shortPaths';
import { Analytics, Journal, Operation } from 'pages/Bank';
import { Redirect } from '../../ui/Redirect/Redirect';

import { Routes } from '../../model/types/routes';

export const banksConfig: Routes = {
  path: BANK,
  element: <BankLayout />,
  children: [
    { index: true, element: <Redirect redirect={OPERATIONS_ROUTE} /> },
    {
      children: [
        {
          path: OPERATIONS,
          element: <Operation />,
        },
        {
          path: ANALYTICS,
          element: <Analytics />,
        },
        {
          path: JOURNAL,
          element: <Journal />,
        },
      ],
    },
  ],
};
