import React from 'react';
import MovieCard from './MovieCard';
import styles from './MovieRow.module.css';

export default function MovieRow({ title, movies = [], isLoading }) {
  if (isLoading) return (
    <div className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cards}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    </div>
  );

  if (!movies.length) return null;

  return (
    <div className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cards}>
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
