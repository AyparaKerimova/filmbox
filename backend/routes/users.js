import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/users/mylist
router.get('/mylist', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('myList');
    res.json(user.myList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/mylist/:movieId
router.post('/mylist/:movieId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const alreadyAdded = user.myList.includes(req.params.movieId);
    if (alreadyAdded) return res.status(400).json({ message: 'Film zaten listenizde' });

    user.myList.push(req.params.movieId);
    await user.save();
    res.json({ message: 'Listeye eklendi', myList: user.myList });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/users/mylist/:movieId
router.delete('/mylist/:movieId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.myList = user.myList.filter((id) => id.toString() !== req.params.movieId);
    await user.save();
    res.json({ message: 'Listeden çıkarıldı', myList: user.myList });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
