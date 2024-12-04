const config = {}

if (process.env.NODE_ENV !== "production") {
  config.siteUrl = "http://localhost:5000"
} else {
  const protocol =
    typeof window !== "undefined" ? window.location.protocol : "https:"

  config.siteUrl = protocol + "//yoursite.com"
}

export default config
