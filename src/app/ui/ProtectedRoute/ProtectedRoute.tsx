import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { useStore } from 'store/useStore';

import { AUTH_ROUTE } from 'shared/lib/const/routes/fullPaths';

export const ProtectedRoute = (props: PropsWithChildren) => {
  const { children } = props;

  const userName = useStore((state) => state.name);

  if (!userName) {
    return <Navigate to={AUTH_ROUTE} replace />;
  }

  return children;
};
