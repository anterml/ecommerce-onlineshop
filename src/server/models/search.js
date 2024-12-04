import mongoose from "mongoose"
const Schema = mongoose.Schema

const Search = new Schema({
  engCategory: String,
  urlName: String,
  name: String,
  brand: String,
  keywords: [String],
  price: Number,
  type: String,
  imageUrl: String,
  productCode: String,
})

export default mongoose.model("Search", Search)
