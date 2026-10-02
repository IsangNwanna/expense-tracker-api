function notFound(req, _res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

function errorHandler(error, _req, res, _next) {
  const status = Number(error.status) || 500;
  const message = status >= 500 ? 'An unexpected server error occurred.' : error.message;
  if (status >= 500) console.error(error);
  res.status(status).json({ success: false, error: { message } });
}

module.exports = { notFound, errorHandler };
