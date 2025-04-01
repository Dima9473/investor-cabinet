import classNames from 'classnames';
import {
  NavLink as RouterLink,
  NavLinkProps as RouterLinkProps,
} from 'react-router';

import styles from './NavLink.module.css';

export const NavLink = (props: RouterLinkProps) => {
  const { children, className, ...rest } = props;

  return (
    <RouterLink {...rest} className={classNames(styles.link, className)}>
      {children}
    </RouterLink>
  );
};

NavLink.displayName = 'NavLink';
