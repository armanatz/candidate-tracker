import { Outlet } from 'react-router-dom';

import NavBar from './Navbar';

import styles from './Layout.module.scss';

type LayoutProps = React.PropsWithChildren;

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <main className={styles.container}>{children || <Outlet />}</main>
    </>
  );
}
