import { Navigate, useLocation } from 'react-router';

import { OPERATIONS_ROUTE } from 'shared/lib/const/routes/fullPaths';

export type RedirectProps = {
  redirect?: string;
};

export const Redirect = (props: RedirectProps) => {
  const { redirect } = props;
  const { state } = useLocation();

  const defaultUrl = redirect ?? OPERATIONS_ROUTE;

  return <Navigate to={state?.redirect ?? defaultUrl} />;
};
