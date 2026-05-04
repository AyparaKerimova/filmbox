import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetFeaturedMovieQuery, useGetTrendingMoviesQuery, useGetNewMoviesQuery, useGetMoviesQuery } from '../features/movies/moviesApi';
import MovieRow from '../components/ui/MovieRow';
import styles from './HomePage.module.css';

const COLOR_MAP = {
  c1: 'linear-gradient(135deg,#1a1a2e,#0f3460)',
  c2: 'linear-gradient(135deg,#2d1b69,#11998e)',
  c8: 'linear-gradient(135deg,#0f0c29,#24243e)',
};

export default function HomePage() {
  const navigate = useNavigate();
  const { data: featured, isLoading: featuredLoading } = useGetFeaturedMovieQuery();
  const { data: trending, isLoading: trendingLoading } = useGetTrendingMoviesQuery();
  const { data: newMovies, isLoading: newLoading } = useGetNewMoviesQuery();
  const { data: dramaData, isLoading: dramaLoading } = useGetMoviesQuery({ genre: 'Dram' });

  const bg = featured ? (COLOR_MAP[featured.posterColor] || COLOR_MAP.c1) : '#141414';

  return (
    <div className={styles.page}>
      {/* HERO */}
      <div className={styles.hero} style={{ background: bg }}>
        <div className={styles.heroGradient} />
        {featuredLoading ? (
          <div className={styles.heroSkeleton} />
        ) : featured ? (
          <div className={styles.heroContent}>
            <span className={styles.badge}>🏆 Yılın Filmi</span>
            <h1 className={styles.heroTitle}>{featured.title}</h1>
            <div className={styles.heroMeta}>
              <span className={styles.match}>{featured.matchScore}% Eşleşme</span>
              <span className={styles.year}>{featured.year}</span>
              <span className={styles.ratingBadge}>{featured.rating}</span>
              {featured.type === 'series'
                ? <span className={styles.dim}>{featured.seasons} Sezon</span>
                : <span className={styles.dim}>{featured.duration}</span>
              }
            </div>
            <p className={styles.heroDesc}>{featured.shortDesc || featured.description}</p>
            <div className={styles.heroBtns}>
              <button className={styles.btnPlay} onClick={() => navigate(`/movie/${featured.slug}`)}>
                ▶ Oynat
              </button>
              <button className={styles.btnMore} onClick={() => navigate(`/movie/${featured.slug}`)}>
                ℹ Daha Fazla
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* ROWS */}
      <div className={styles.rows}>
        <MovieRow title="🔥 Türkiye'de Bugün En Çok İzlenenler" movies={trending} isLoading={trendingLoading} />
        <MovieRow title="✨ Dramalar" movies={dramaData?.movies} isLoading={dramaLoading} />
        <MovieRow title="🎬 Yeni Eklenenler" movies={newMovies} isLoading={newLoading} />
      </div>
    </div>
  );
}
