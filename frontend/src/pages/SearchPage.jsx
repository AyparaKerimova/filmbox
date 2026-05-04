import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetMoviesQuery, useGetGenresQuery } from '../features/movies/moviesApi';
import MovieCard from '../components/ui/MovieCard';
import styles from './SearchPage.module.css';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [activeGenre, setActiveGenre] = useState('');
  const typeParam = searchParams.get('type') || '';

  const { data, isLoading } = useGetMoviesQuery({
    ...(search && { search }),
    ...(activeGenre && { genre: activeGenre }),
    ...(typeParam && { type: typeParam }),
  });

  const { data: genres = [] } = useGetGenresQuery();

  return (
    <div className={styles.page}>
      <div className={styles.searchBar}>
        <span>🔍</span>
        <input
          type="text"
          placeholder="Dizi, film veya oyuncu ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.genres}>
        <button
          className={`${styles.pill} ${activeGenre === '' ? styles.active : ''}`}
          onClick={() => setActiveGenre('')}
        >
          Tümü
        </button>
        {genres.map((g) => (
          <button
            key={g}
            className={`${styles.pill} ${activeGenre === g ? styles.active : ''}`}
            onClick={() => setActiveGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className={styles.grid}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : data?.movies?.length === 0 ? (
        <p className={styles.empty}>Sonuç bulunamadı.</p>
      ) : (
        <div className={styles.grid}>
          {data?.movies?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
