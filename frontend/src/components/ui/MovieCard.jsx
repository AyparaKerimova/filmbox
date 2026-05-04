import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.css';

const COLOR_MAP = {
  c1: 'linear-gradient(135deg,#1a1a2e,#0f3460)',
  c2: 'linear-gradient(135deg,#2d1b69,#11998e)',
  c3: 'linear-gradient(135deg,#0f2027,#2c5364)',
  c4: 'linear-gradient(135deg,#3a1c71,#ffaf7b)',
  c5: 'linear-gradient(135deg,#1f4037,#99f2c8)',
  c6: 'linear-gradient(135deg,#360033,#0b8793)',
  c7: 'linear-gradient(135deg,#4b1248,#f10711)',
  c8: 'linear-gradient(135deg,#0f0c29,#24243e)',
  c9: 'linear-gradient(135deg,#1d2b64,#f8cdda)',
  c10: 'linear-gradient(135deg,#2b5876,#4e4376)',
  c11: 'linear-gradient(135deg,#52c234,#061700)',
  c12: 'linear-gradient(135deg,#8e0e00,#1f1f1f)',
};

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const bg = COLOR_MAP[movie.posterColor] || COLOR_MAP.c1;

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/movie/${movie.slug}`)}
    >
      <div className={styles.thumb} style={{ background: bg }}>
        {movie.top10Rank && (
          <span className={styles.badgeTop}>TOP {movie.top10Rank}</span>
        )}
        {movie.isNew && !movie.top10Rank && (
          <span className={styles.badgeNew}>YENİ</span>
        )}
        <div className={styles.overlay} />
        <div className={styles.info}>
          <p className={styles.title}>{movie.title}</p>
          <p className={styles.meta}>
            {movie.matchScore}% · {movie.year}
          </p>
        </div>
      </div>
    </div>
  );
}
