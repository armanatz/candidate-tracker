import { useState } from 'react';

import logo from '../../../assets/logo.svg';

import styles from './Navbar.module.scss';

export default function NavBar() {
  const [imgLoaded, setImageLoaded] = useState(false);

  return (
    <header className={styles.container}>
      <div>
        <div className={styles.logo}>
          {/* If the image hasn't fully loaded yet, let's show text instead. */}
          {!imgLoaded ? <h1>Company</h1> : null}
          <img
            alt="Company Logo"
            src={logo}
            onLoad={() => setImageLoaded(true)}
          />
          <p>Candidate Tracker</p>
        </div>
      </div>
    </header>
  );
}
