import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetMyListQuery, selectIsLoggedIn } from '../features/auth/authSlice';
import MovieCard from '../components/ui/MovieCard';
import styles from './MyListPage.module.css';

export default function MyListPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data: myList = [], isLoading } = useGetMyListQuery(undefined, { skip: !isLoggedIn });

  if (!isLoggedIn) return (
    <div className={styles.empty}>
      <p>Listenizi görmek için giriş yapın.</p>
      <Link to="/login" className={styles.loginBtn}>Giriş Yap</Link>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Listem</h1>
        <p className={styles.count}>{myList.length} başlık kaydedildi</p>
      </div>

      {isLoading ? (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : myList.length === 0 ? (
        <div className={styles.empty}>
          <p>Henüz liste boş.</p>
          <Link to="/" className={styles.loginBtn}>Film Keşfet</Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {myList.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
