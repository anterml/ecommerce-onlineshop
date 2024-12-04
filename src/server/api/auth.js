import passport from "passport"
import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).end()

  res.json(req.user)
})

router.get("/instagram", passport.authenticate("instagram"))
router.get(
  "/instagram/callback",
  passport.authenticate("instagram", { failureRedirect: "/" }),
  (req, res) => res.redirect("/"),
)

router.get("/google", passport.authenticate("google", { scope: ["profile"] }))
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect("/"),
)

router.get("/odnoklassniki", passport.authenticate("odnoklassniki"))
router.get(
  "/odnoklassniki/callback/",
  passport.authenticate("odnoklassniki", { failureRedirect: "/" }),
  (req, res) => res.redirect("/"),
)

router.get("/twitter", passport.authenticate("twitter"))
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => res.redirect("/"),
)

router.get("/facebook", passport.authenticate("facebook"))
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => res.redirect("/"),
)

router.get("/vkontakte", passport.authenticate("vkontakte"))
router.get(
  "/vkontakte/callback",
  passport.authenticate("vkontakte", { failureRedirect: "/" }),
  (req, res) => res.redirect("/"),
)

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})

export default router
