import User from "./models/users"
import config from "./config/base"

const VKontakteStrategy = require("passport-vkontakte").Strategy
const TwitterStrategy = require("passport-twitter").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const OdnoklassnikiStrategy = require("passport-odnoklassniki").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const InstagramStrategy = require("passport-instagram").Strategy

function findOrCreateUser(provider, profile, done) {
  User.findOne({ provider, providerId: profile.id }, (err, user) => {
    if (err) return done(err)
    if (user) return done(err, user)
    try {
      var user = new User({
        username: profile.displayName,
        provider,
        providerId: profile.id,
      })

      user.save(err => {
        if (err) console.log(err)
        return done(err, user)
      })
    } catch (e) {
      console.log("errorrr", e)
    }
  })
}
export default passport => {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, done)
  })

  passport.use(
    new InstagramStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: config.siteUrl + "/api/auth/instagram/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        findOrCreateUser("instagram", profile, done)
      },
    ),
  )

  passport.use(
    new GoogleStrategy(
      {
        clientID: "",
        clientSecret: "",
        callbackURL: config.siteUrl + "/api/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        findOrCreateUser("google", profile, done)
      },
    ),
  )

  passport.use(
    new OdnoklassnikiStrategy(
      {
        authorizationURL: "https://connect.ok.ru/oauth/authorize",
        tokenURL: "https://api.ok.ru/oauth/token.do",
        clientID: 0,
        //scope: "GET_EMAIL",
        clientPublic: "",
        clientSecret: "",
        callbackURL: config.siteUrl + "/api/auth/odnoklassniki/callback/",
      },
      (accessToken, refreshToken, profile, done) => {
        findOrCreateUser("ok", profile, done)
      },
    ),
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: 0,
        clientSecret: "",
        callbackURL: config.siteUrl + "/api/auth/facebook/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        findOrCreateUser("facebook", profile, done)
      },
    ),
  )

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: "",
        consumerSecret: "",
        callbackURL: config.siteUrl + "/api/auth/twitter/callback",
      },
      (token, tokenSecret, profile, done) => {
        findOrCreateUser("twitter", profile, done)
      },
    ),
  )

  passport.use(
    new VKontakteStrategy(
      {
        clientID: 0,
        clientSecret: "",
        callbackURL: config.siteUrl + "/api/auth/vkontakte/callback",
        profileFields: ["email", "city"],
      },
      (accessToken, refreshToken, profile, done) => {
        findOrCreateUser("vkontakte", profile, done)
      },
    ),
  )
}
