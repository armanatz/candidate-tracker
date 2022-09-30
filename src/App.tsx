import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import FullPageLoader from './components/FullPageLoader';

const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

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

        <Route
          path="404"
          element={
            <Suspense fallback={<FullPageLoader />}>
              <NotFound />
            </Suspense>
          }
        />

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
