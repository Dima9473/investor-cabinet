import { NavLink } from 'react-router';

import { T_BANK_ROUTE } from 'shared/lib/const/routes/fullPaths';

import styles from './Banks.module.css';

export const Banks = () => {
  return (
    <div className={styles.container}>
      Banks
      <br />
      <NavLink
        to={T_BANK_ROUTE}
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'black',
        })}
      >
        T-bank
      </NavLink>
    </div>
  );
};

Banks.displayName = 'Banks';
