import { T_BANK_OPERATIONS_ROUTE } from 'shared/lib/const/routes/fullPaths';
import { BANKS, T_BANK_OPERATIONS } from 'shared/lib/const/routes/shortPaths';
import { Bank } from 'pages/Bank';
import { Redirect } from '../../ui/Redirect/Redirect';

import { Routes } from '../../model/types/routes';

export const banksConfig: Routes = {
  path: BANKS,
  children: [
    { index: true, element: <Redirect redirect={T_BANK_OPERATIONS_ROUTE} /> },
    {
      children: [
        {
          path: T_BANK_OPERATIONS,
          element: <Bank />,
        },
        // {
        //   path: T_BANK_OPERATIONS_ROUTE,
        //   element: <BankOperations />,
        // },
      ],
    },
  ],
};
