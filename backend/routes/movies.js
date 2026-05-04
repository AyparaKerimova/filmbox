import express from 'express';
import Movie from '../models/Movie.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/movies - tüm filmler (filtre + arama + pagination)
router.get('/', async (req, res) => {
  try {
    const { genre, type, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (genre) query.genres = { $in: [genre] };
    if (type) query.type = type;
    if (search) query.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);
    const [movies, total] = await Promise.all([
      Movie.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Movie.countDocuments(query),
    ]);

    res.json({ movies, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/movies/featured - hero banner filmi
router.get('/featured', async (req, res) => {
  try {
    const movie = await Movie.findOne({ featured: true });
    if (!movie) return res.status(404).json({ message: 'Öne çıkan film bulunamadı' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/movies/trending - trend filmler
router.get('/trending', async (req, res) => {
  try {
    const movies = await Movie.find({ trending: true }).sort({ top10Rank: 1 }).limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/movies/new - yeni eklenenler
router.get('/new', async (req, res) => {
  try {
    const movies = await Movie.find({ isNew: true }).sort({ createdAt: -1 }).limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/movies/genres - tüm türler
router.get('/genres', async (req, res) => {
  try {
    const genres = await Movie.distinct('genres');
    res.json(genres.sort());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/movies/:slug - tek film detayı
router.get('/:slug', async (req, res) => {
  try {
    const movie = await Movie.findOne({ slug: req.params.slug });
    if (!movie) return res.status(404).json({ message: 'Film bulunamadı' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
