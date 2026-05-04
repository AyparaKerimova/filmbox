import { createSlice } from '@reduxjs/toolkit';
import { baseApi } from '../../app/baseApi';

// RTK Query auth endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
  }),
});

// User RTK Query endpoints (myList)
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyList: builder.query({
      query: () => '/users/mylist',
      providesTags: ['MyList'],
    }),
    addToMyList: builder.mutation({
      query: (movieId) => ({
        url: `/users/mylist/${movieId}`,
        method: 'POST',
      }),
      invalidatesTags: ['MyList'],
    }),
    removeFromMyList: builder.mutation({
      query: (movieId) => ({
        url: `/users/mylist/${movieId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MyList'],
    }),
  }),
});

// Auth state slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('filmbox_user')) || null,
    token: localStorage.getItem('filmbox_token') || null,
  },
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('filmbox_user', JSON.stringify(action.payload.user));
      localStorage.setItem('filmbox_token', action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('filmbox_user');
      localStorage.removeItem('filmbox_token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
} = authApi;

export const {
  useGetMyListQuery,
  useAddToMyListMutation,
  useRemoveFromMyListMutation,
} = userApi;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => !!state.auth.token;
