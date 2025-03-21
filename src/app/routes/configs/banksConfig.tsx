import { BANKS, T_BANK } from 'shared/lib/const/routes/shortPaths';
import { TBank } from 'pages/Banks';

import { Routes } from '../../model/types/routes';

export const banksConfig: Routes = {
  path: BANKS,
  children: [
    {
      path: T_BANK,
      element: <TBank />,
    },
  ],
};
