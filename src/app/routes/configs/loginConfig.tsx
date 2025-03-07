import { Auth } from 'pages/Auth';

import { Routes } from '../../model/types/routes';

export const loginConfig: Routes[] = [
  /**
   * Добавлять доп роуты для вхоа
   * например логин через другие сервисы
   */
  {
    index: true,
    element: <Auth />,
  },
];
