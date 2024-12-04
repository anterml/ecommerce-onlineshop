import mongoose from "mongoose"
const { Schema } = mongoose

const Sets = new mongoose.Schema({
  name: String,
  kind: Number,
  productIds: [Schema.Types.ObjectId],

  created: {
    author: String,
    authorId: Schema.Types.ObjectId,
    date: {
      type: Date,
      default: Date.now,
    },
  },

  updated: {
    author: String,
    authorId: Schema.Types.ObjectId,
    date: Date,
  },
})

export default mongoose.model("Sets", Sets)
