import mongoose from "mongoose"
const Schema = mongoose.Schema

const Revision = new Schema({
  product: {
    _id: Schema.Types.ObjectId,
    name: String,
    category: String,
  },
  author: {
    _id: Schema.Types.ObjectId,
    name: String,
  },
  status: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
})

export default mongoose.model("Revision", Revision)
