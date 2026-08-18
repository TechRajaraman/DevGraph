export function validateIdParam(req, res, next) {
  if (!/^[A-Za-z0-9_-]+$/.test(req.params.id)) return res.status(400).json({ success: false, error: 'Invalid id' });
  next();
}
