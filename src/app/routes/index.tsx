import { Route, Routes as ReactRoutes } from 'react-router';

import { About } from '../../pages/About';
import { Home } from '../../pages/Home';
import { Banks, TBank } from '../../pages/Banks';

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="banks">
        <Route index element={<Banks />} />
        <Route path="t-bank" element={<TBank />} />
      </Route>
    </ReactRoutes>
  );
};
