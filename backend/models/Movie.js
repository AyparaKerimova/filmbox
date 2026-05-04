import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDesc: { type: String },
    year: { type: Number, required: true },
    duration: { type: String },
    rating: { type: String, enum: ['G', '7+', '13+', '16+', '18+'], default: '13+' },
    imdbScore: { type: Number, min: 0, max: 10 },
    matchScore: { type: Number, min: 0, max: 100 },
    genres: [{ type: String }],
    type: { type: String, enum: ['movie', 'series'], default: 'movie' },
    seasons: { type: Number, default: null },
    episodes: { type: Number, default: null },
    director: { type: String },
    cast: [
      {
        name: { type: String },
        role: { type: String },
        initials: { type: String },
        colorClass: { type: String },
      },
    ],
    posterColor: { type: String, default: 'c1' },
    backdropColor: { type: String, default: 'c1' },
    trailerUrl: { type: String, default: null },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
    top10Rank: { type: Number, default: null },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

movieSchema.index({ title: 'text', description: 'text', genres: 'text' });

export default mongoose.model('Movie', movieSchema);
