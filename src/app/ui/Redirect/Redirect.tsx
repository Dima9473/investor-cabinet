import { Navigate, useLocation } from 'react-router';

import { BANKS } from 'shared/lib/const/routes/shortPaths';

export type RedirectProps = {
  redirect?: string;
};

export const Redirect = (props: RedirectProps) => {
  const { redirect } = props;
  const { state } = useLocation();

  const defaultUrl = redirect ?? BANKS;

  return <Navigate to={state?.redirect ?? defaultUrl} />;
};
