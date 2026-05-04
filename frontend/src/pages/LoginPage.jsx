import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation, useRegisterMutation, setCredentials } from '../features/auth/authSlice';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const isLoading = loginLoading || registerLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = isRegister
        ? await register(form).unwrap()
        : await login({ email: form.email, password: form.password }).unwrap();
      dispatch(setCredentials(result));
      navigate('/');
    } catch (err) {
      setError(err?.data?.message || 'Bir hata oluştu');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Link to="/" className={styles.logo}>FILMBOX</Link>
        <h2 className={styles.heading}>{isRegister ? 'Kayıt Ol' : 'Giriş Yap'}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {isRegister && (
            <input
              className={styles.input}
              type="text" placeholder="Ad Soyad"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          )}
          <input
            className={styles.input}
            type="email" placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className={styles.input}
            type="password" placeholder="Şifre"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.btn} type="submit" disabled={isLoading}>
            {isLoading ? 'Yükleniyor...' : isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </form>

        <p className={styles.toggle}>
          {isRegister ? 'Zaten hesabın var mı?' : 'Hesabın yok mu?'}{' '}
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </p>
      </div>
    </div>
  );
}
