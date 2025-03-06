import { PropsWithChildren } from 'react';
import { Route, Routes as ReactRoutes } from 'react-router';

import { Home } from '../../pages/Home';

export const Routes = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <ReactRoutes>
      <Route index element={<Home />} />
      {children}
      <button></button>
    </ReactRoutes>
  );
};
