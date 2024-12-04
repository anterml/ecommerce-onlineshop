import mongoose from "mongoose"

const Users = mongoose.Schema({
  username: String,
  password: String,
  provider: String,
  providerId: String,
  admin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  accessList: [],
  restrict: Boolean,
})

export default mongoose.model("Users", Users)
