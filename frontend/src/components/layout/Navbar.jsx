import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser, selectIsLoggedIn } from '../../features/auth/authSlice';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectCurrentUser);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>FILMBOX</Link>

      <ul className={styles.links}>
        <li><Link to="/">Ana Sayfa</Link></li>
        <li><Link to="/search?type=series">Diziler</Link></li>
        <li><Link to="/search?type=movie">Filmler</Link></li>
        {isLoggedIn && <li><Link to="/mylist">Listem</Link></li>}
      </ul>

      <div className={styles.right}>
        <button className={styles.iconBtn} onClick={() => navigate('/search')}>🔍</button>
        {isLoggedIn ? (
          <>
            <div className={styles.avatar} title={user?.name}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <button className={styles.logoutBtn} onClick={() => dispatch(logout())}>Çıkış</button>
          </>
        ) : (
          <Link to="/login" className={styles.loginBtn}>Giriş Yap</Link>
        )}
      </div>
    </nav>
  );
}
