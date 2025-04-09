import { Outlet } from 'react-router';

import { Controls } from 'widgets/Bank';
export const BankLayout = () => {
  return (
    <div>
      <Controls />
      <Outlet />
    </div>
  );
};

BankLayout.displayName = 'BankLayout';
