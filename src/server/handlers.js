export const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

export const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated() || !req.user.admin) return res.status(401).end()

  next()
}
