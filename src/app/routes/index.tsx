import { Routes as ReactRoutes, Route } from 'react-router';
import { PropsWithChildren } from 'react';

export const Routes = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <ReactRoutes>
      <Route index element={<>testdsfdfsdfsdfs</>} />
      {children}
      <button></button>
    </ReactRoutes>
  );
};
