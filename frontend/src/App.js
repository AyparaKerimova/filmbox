import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchPage from './pages/SearchPage';
import MyListPage from './pages/MyListPage';
import LoginPage from './pages/LoginPage';
import './index.css';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/movie/:slug" element={<MovieDetailPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/mylist" element={<MyListPage />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
