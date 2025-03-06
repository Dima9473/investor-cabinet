import { NavLink } from 'react-router';

import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.container}>
      Home first page
      <br />
      <NavLink
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'black',
        })}
      >
        About
      </NavLink>
      <br />
      <NavLink
        to="/banks"
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'black',
        })}
      >
        Banks
      </NavLink>
    </div>
  );
};
