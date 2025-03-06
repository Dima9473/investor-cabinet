import { NavLink } from 'react-router';

export const Banks = () => {
  return (
    <>
      Banks
      <br />
      <NavLink
        to="/banks/t-bank"
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'black',
        })}
      >
        T-bank
      </NavLink>
    </>
  );
};
