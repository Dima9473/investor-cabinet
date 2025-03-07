import { Navigate } from 'react-router';
import { useStore } from 'store/useStore';

import { BANKS } from 'shared/lib/const/routes/shortPaths';
import { AuthContent } from '../AuthContent/AuthContent';

export const Auth = () => {
  const name = useStore((state) => state.name);

  if (!name) {
    return <AuthContent />;
  }

  return <Navigate to={BANKS} replace />;
};
