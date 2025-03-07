import { Navigate, useLocation } from 'react-router';

import { BANKS_ROUTE } from 'shared/lib/const/routes/fullPaths';

export const Redirect = () => {
  const { state } = useLocation();

  return <Navigate to={state?.redirect ?? BANKS_ROUTE} />;
};
