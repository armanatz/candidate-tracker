import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import FullPageLoader from './components/FullPageLoader';

const Home = lazy(() => import('./pages/Home'));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<FullPageLoader />}>
              <Home />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
