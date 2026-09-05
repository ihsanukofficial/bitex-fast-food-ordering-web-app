import { ApiError } from '../utils/ApiError.js';

/**
 * Translates thrown errors into JSON responses. Mongoose validation/cast errors
 * and duplicate-key errors are mapped to 400s instead of leaking as 500s.
 */
export const errorHandler = (err, req, res, _next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).json({ message: err.message });
    return;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    res.status(409).json({ message: `That ${field} is already in use.` });
    return;
  }

  console.error(err);
  res.status(500).json({ message: 'Something went wrong. Please try again.' });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `No route matches ${req.method} ${req.originalUrl}.` });
};
