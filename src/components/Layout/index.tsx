import { Outlet } from 'react-router-dom';

import NavBar from './Navbar';

import styles from './Layout.module.scss';

export default function Layout() {
  return (
    <>
      <NavBar />
      <main className={styles.container}>
        <Outlet />
      </main>
    </>
  );
}
