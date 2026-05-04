import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMovieBySlugQuery } from '../features/movies/moviesApi';
import {
  useAddToMyListMutation,
  useRemoveFromMyListMutation,
  useGetMyListQuery,
  selectIsLoggedIn,
} from '../features/auth/authSlice';
import styles from './MovieDetailPage.module.css';

const COLOR_MAP = {
  c1:'linear-gradient(135deg,#1a1a2e,#0f3460)',c2:'linear-gradient(135deg,#2d1b69,#11998e)',
  c3:'linear-gradient(135deg,#0f2027,#2c5364)',c4:'linear-gradient(135deg,#3a1c71,#ffaf7b)',
  c5:'linear-gradient(135deg,#1f4037,#99f2c8)',c6:'linear-gradient(135deg,#360033,#0b8793)',
  c7:'linear-gradient(135deg,#4b1248,#f10711)',c8:'linear-gradient(135deg,#0f0c29,#24243e)',
  c9:'linear-gradient(135deg,#1d2b64,#f8cdda)',c10:'linear-gradient(135deg,#2b5876,#4e4376)',
  c11:'linear-gradient(135deg,#52c234,#061700)',c12:'linear-gradient(135deg,#8e0e00,#1f1f1f)',
};

function getYouTubeId(url) {
  if (!url) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const match = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  );
  return match ? match[1] : null;
}

export default function MovieDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const { data: movie, isLoading, isError } = useGetMovieBySlugQuery(slug);
  const { data: myList = [] } = useGetMyListQuery(undefined, { skip: !isLoggedIn });
  const [addToMyList, { isLoading: adding }] = useAddToMyListMutation();
  const [removeFromMyList, { isLoading: removing }] = useRemoveFromMyListMutation();

  if (isLoading) return (
    <div className={styles.loading}><div className={styles.spinner} /></div>
  );
  if (isError || !movie) return (
    <div className={styles.error}>
      <p>Film bulunamadı.</p>
      <button onClick={() => navigate('/')}>Ana Sayfaya Dön</button>
    </div>
  );

  const bg = COLOR_MAP[movie.backdropColor] || COLOR_MAP.c1;
  const isInList = myList.some((m) => m._id === movie._id || m === movie._id);
  const youtubeId = getYouTubeId(movie.trailerUrl);

  const handleListToggle = async () => {
    if (!isLoggedIn) return navigate('/login');
    if (isInList) await removeFromMyList(movie._id);
    else await addToMyList(movie._id);
  };

  return (
    <div className={styles.page}>
      <div className={styles.backdrop} style={{ background: bg }}>
        <div className={styles.backdropGradient} />
        <div className={styles.heroContent}>
          {movie.top10Rank && <span className={styles.badge}>TOP {movie.top10Rank}</span>}
          <h1 className={styles.title}>{movie.title}</h1>
          <div className={styles.meta}>
            <span className={styles.match}>{movie.matchScore}% Eşleşme</span>
            <span>{movie.year}</span>
            <span className={styles.ratingBadge}>{movie.rating}</span>
            {movie.type === 'series'
              ? <span className={styles.dim}>{movie.seasons} Sezon · {movie.episodes} Bölüm</span>
              : <span className={styles.dim}>{movie.duration}</span>}
            {movie.imdbScore && <span className={styles.imdb}>⭐ {movie.imdbScore}</span>}
          </div>
          <div className={styles.btns}>
            <button className={styles.btnPlay} onClick={() => setTrailerOpen(true)}>
              ▶ {youtubeId ? 'Fragmanı İzle' : 'Oynat'}
            </button>
            <button
              className={`${styles.btnList} ${isInList ? styles.btnListActive : ''}`}
              onClick={handleListToggle}
              disabled={adding || removing}
            >
              {isInList ? '✓ Listede' : '+ Listeye Ekle'}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.grid}>
          <div>
            <p className={styles.desc}>{movie.description}</p>
            {movie.cast?.length > 0 && (
              <div className={styles.castSection}>
                <h3 className={styles.sectionTitle}>Oyuncular</h3>
                <div className={styles.castList}>
                  {movie.cast.map((actor, i) => (
                    <div key={i} className={styles.castCard}>
                      <div className={`${styles.avatar} ${styles[actor.colorClass]}`}>
                        {actor.initials}
                      </div>
                      <p className={styles.actorName}>{actor.name}</p>
                      <p className={styles.actorRole}>{actor.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.sidebar}>
            {movie.cast?.length > 0 && (
              <p><span className={styles.label}>Oyuncular: </span>{movie.cast.map(c => c.name).join(', ')}</p>
            )}
            {movie.director && <p><span className={styles.label}>Yönetmen: </span>{movie.director}</p>}
            <p><span className={styles.label}>Türler: </span>{movie.genres?.join(', ')}</p>
            <p><span className={styles.label}>Tür: </span>{movie.type === 'series' ? 'Dizi' : 'Film'}</p>
          </div>
        </div>
      </div>

      {/* TRAILER MODAL */}
      {trailerOpen && (
        <div className={styles.modalOverlay} onClick={() => setTrailerOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{movie.title}</h2>
              <button className={styles.closeBtn} onClick={() => setTrailerOpen(false)}>✕</button>
            </div>

            {youtubeId ? (
              <div className={styles.iframeWrapper}>
                <iframe
                  className={styles.iframe}
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  title={`${movie.title} Fragman`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className={styles.trailerScreen} style={{ background: bg }}>
                <div className={styles.noTrailer}>
                  <span className={styles.noTrailerIcon}>🎬</span>
                  <p>Fragman henüz eklenmedi</p>
                  <span className={styles.noTrailerSub}>MongoDB'de bu filme <code>trailerUrl</code> ekle</span>
                </div>
              </div>
            )}

            <div className={styles.modalBody}>
              <p className={styles.modalDesc}>{movie.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
