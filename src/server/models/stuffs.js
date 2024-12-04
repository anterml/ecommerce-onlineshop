import mongoose from "mongoose"
const Schema = mongoose.Schema

const Stuffs = new Schema({
  fieldName: String,
  data: Schema.Types.Mixed,
})

export default mongoose.model("Stuffs", Stuffs)
