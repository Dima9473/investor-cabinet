import classNames from 'classnames';
import {
  NavLink as RouterLink,
  NavLinkProps as RouterLinkProps,
} from 'react-router';

import styles from './NavLink.module.css';

export const NavLink = (props: RouterLinkProps) => {
  const { children, className, ...rest } = props;

  return (
    <RouterLink
      className={({ isActive }) =>
        classNames(className, styles.link, isActive && styles.isActive)
      }
      {...rest}
    >
      {children}
    </RouterLink>
  );
};

NavLink.displayName = 'NavLink';
