import mongoose from "mongoose"
const Schema = mongoose.Schema

const Products = new Schema({
  category: String,
  name: String,
  url_name: String,
  image_folder: String,
  brand: String,
  description: String,
  full_description: String,
  images: [String],
  badges: [String],
  priority: { type: Number, default: 100 },
  special_number: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  old_price: Number,
  product_code: String,
  colors: [
    {
      name: [String],
      commonNames: [String],
      instock: { type: Boolean, default: false },
      hidden: { type: Boolean, default: false },
      price: { type: Number, default: 0 },
      default: { type: Boolean, default: false },
      image_url: String,
    },
  ],
  attrs: Schema.Types.Mixed,
  parameters: [],
  optional_list: [String],
})

export default mongoose.model("Products", Products)
