const config = {}

if (process.env.NODE_ENV !== "production") {
  config.dbPath = "yourMongodbLocalPath"
} else {
  config.dbPath = "yourMongodbProductionPath"
}

export default config
