# 🎬 Filmbox — Netflix Tarzı Film Sitesi

React + Redux Toolkit (RTK Query) + Node.js + Express + MongoDB

---

## 📁 Proje Yapısı

```
filmbox/
├── backend/          → Node.js + Express + MongoDB API
│   ├── models/       → Mongoose modelleri (Movie, User)
│   ├── routes/       → API rotaları (movies, auth, users)
│   ├── middleware/   → JWT auth middleware
│   ├── server.js     → Express sunucusu
│   └── seed.js       → Demo veri yükleme scripti
│
└── frontend/         → React + RTK Query
    └── src/
        ├── app/          → Redux store + baseApi
        ├── features/
        │   ├── movies/   → moviesApi (RTK Query)
        │   └── auth/     → authSlice + authApi + userApi
        ├── components/
        │   ├── ui/       → MovieCard, MovieRow
        │   └── layout/   → Navbar
        └── pages/        → HomePage, MovieDetailPage, SearchPage, MyListPage, LoginPage
```

---

## 🚀 Kurulum

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# .env dosyasını düzenle (MONGO_URI, JWT_SECRET)
npm run seed    # Demo filmleri yükle
npm run dev     # Sunucuyu başlat (http://localhost:5000)
```

### 2. Frontend

```bash
cd frontend
npm install
npm start       # http://localhost:3001
```

---

## 🔌 API Endpointleri

| Method | URL                   | Açıklama                                 |
| ------ | --------------------- | ---------------------------------------- |
| GET    | /api/movies           | Tüm filmler (filtre + arama + sayfalama) |
| GET    | /api/movies/featured  | Hero banner filmi                        |
| GET    | /api/movies/trending  | Trend filmler                            |
| GET    | /api/movies/new       | Yeni eklenenler                          |
| GET    | /api/movies/genres    | Tüm türler                               |
| GET    | /api/movies/:slug     | Film detayı                              |
| POST   | /api/auth/register    | Kayıt                                    |
| POST   | /api/auth/login       | Giriş                                    |
| GET    | /api/auth/me          | Mevcut kullanıcı                         |
| GET    | /api/users/mylist     | Listem (auth gerekli)                    |
| POST   | /api/users/mylist/:id | Listeye ekle (auth gerekli)              |
| DELETE | /api/users/mylist/:id | Listeden çıkar (auth gerekli)            |

---

## ⚙️ RTK Query Hooks

```js
// Film verileri
useGetMoviesQuery({ genre, type, search, page });
useGetFeaturedMovieQuery();
useGetTrendingMoviesQuery();
useGetNewMoviesQuery();
useGetMovieBySlugQuery(slug); // ← Film kartına tıklanınca çalışır
useGetGenresQuery();

// Auth
useLoginMutation();
useRegisterMutation();

// Kullanıcı listesi
useGetMyListQuery();
useAddToMyListMutation();
useRemoveFromMyListMutation();
```

---

## 🌐 Netlify / Vercel Yayını

### Frontend (Vercel)

```bash
cd frontend
npm run build
# Vercel'e dist klasörünü yükle
# Environment variable: REACT_APP_API_URL=https://senin-backend-url.com
```

### Backend (Railway / Render)

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=gizli_anahtar
NODE_ENV=production
```
