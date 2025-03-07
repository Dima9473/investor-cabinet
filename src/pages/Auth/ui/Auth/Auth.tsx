import { Navigate } from 'react-router';
import { useStore } from 'store/useStore';

import { BANKS_ROUTE } from 'shared/lib/const/routes/fullPaths';
import { AuthContent } from '../AuthContent/AuthContent';

export const Auth = () => {
  const name = useStore((state) => state.name);

  if (!name) {
    return <AuthContent />;
  }

  return <Navigate to={BANKS_ROUTE} replace />;
};
