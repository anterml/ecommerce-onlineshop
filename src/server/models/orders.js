import mongoose from "mongoose"
const Schema = mongoose.Schema

const Orders = new Schema({
  createdAt: { type: Date, default: Date.now },
  status: { type: Number, default: 0 },
  changingHistory: [
    {
      name: String,
      value: Schema.Types.Mixed,
      date: Date,
      author: {
        name: String,
        _id: Schema.Types.ObjectId,
      },
    },
  ],
  lastUpdated: {
    date: Date,
    author: {
      name: String,
      _id: Schema.Types.ObjectId,
    },
  },
  comment: String,
  delivery: {},
  recipient: {},
  totalPrice: Number,
  orderType: String,
  payment: String,
  code: String,
  items: [
    {
      productId: Schema.Types.ObjectId,
      name: String,
      urlName: String,
      category: String,
      kind: String,
      price: Number,
      totalPrice: Number,
      count: Number,
      productCode: String,
      configurationCode: String,
      imageFolder: String,
      image: String,
      instock: Number,
      varFields: [{}],
      dynamic: {},
    },
  ],
  adminComments: [
    {
      text: String,
      userName: String,
      userId: Schema.Types.ObjectId,
      date: Date,
    },
  ],
  kassa: {},
})

export default mongoose.model("Orders", Orders)
