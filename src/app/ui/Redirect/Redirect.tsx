import { Navigate, useLocation } from 'react-router';

import { BANKS } from 'shared/lib/const/routes/shortPaths';

export const Redirect = () => {
  const { state } = useLocation();

  return <Navigate to={state?.redirect ?? BANKS} />;
};
