import { baseApi } from '../../app/baseApi';

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Tüm filmler (filtre + arama + pagination)
    getMovies: builder.query({
      query: (params = {}) => ({
        url: '/movies',
        params,
      }),
      providesTags: ['Movie'],
    }),

    // Öne çıkan film (hero banner)
    getFeaturedMovie: builder.query({
      query: () => '/movies/featured',
      providesTags: ['Movie'],
    }),

    // Trend filmler
    getTrendingMovies: builder.query({
      query: () => '/movies/trending',
      providesTags: ['Movie'],
    }),

    // Yeni eklenenler
    getNewMovies: builder.query({
      query: () => '/movies/new',
      providesTags: ['Movie'],
    }),

    // Tek film detayı (slug ile)
    getMovieBySlug: builder.query({
      query: (slug) => `/movies/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Movie', id: slug }],
    }),

    // Tüm türler
    getGenres: builder.query({
      query: () => '/movies/genres',
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetFeaturedMovieQuery,
  useGetTrendingMoviesQuery,
  useGetNewMoviesQuery,
  useGetMovieBySlugQuery,
  useGetGenresQuery,
} = moviesApi;
