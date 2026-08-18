export function notFoundMiddleware(req, res) {
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorMiddleware(error, _req, res, _next) {
  console.error(error);
  const isConnectionError = /connection|service unavailable|ECONN|database/i.test(error?.message || '');
  res.status(isConnectionError ? 503 : 500).json({
    success: false,
    error: isConnectionError ? 'Graph database is currently unavailable. Please try again.' : 'Internal server error'
  });
}
