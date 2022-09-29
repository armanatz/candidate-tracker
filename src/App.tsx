import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense>
            <div>Home</div>
          </Suspense>
        }
      />
    </Routes>
  );
}
