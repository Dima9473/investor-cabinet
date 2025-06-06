import { T_BANK_ROUTE } from 'shared/lib/const/routes/fullPaths';
import { BANKS, T_BANK } from 'shared/lib/const/routes/shortPaths';
import { TBank } from 'pages/Banks';
import { BanksLayout } from '../../ui/BanksLayout';
import { Redirect } from '../../ui/Redirect/Redirect';

import { Routes } from '../../model/types/routes';

export const banksConfig: Routes = {
  path: BANKS,
  element: <BanksLayout />,
  children: [
    { index: true, element: <Redirect redirect={T_BANK_ROUTE} /> },
    {
      children: [
        {
          path: T_BANK,
          element: <TBank />,
        },
      ],
    },
  ],
};
