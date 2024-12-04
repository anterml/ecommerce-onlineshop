import mongoose from "mongoose"
const Schema = mongoose.Schema

const Items = new Schema({
  category: String,
  sections: [Number],

  base: {
    kind: String,
    name: String,
    urlName: String,
    imageFolder: String,
    article: String,

    price: {
      type: Number,
      default: 0,
    },

    oldPrice: Number,

    productCode: String,
  },

  settings: {
    sortPriority: {
      type: Number,
      default: 500,
    },
  },

  description: String,
  shortDescription: String,
  sliderDescription: String,

  images: [String],
  badges: [String],
  attrs: [{}],
  sattrs: [{}],

  vars: {
    groups: [{}],
    configurations: [
      {
        fieldIds: [Schema.Types.ObjectId],
        skipFieldIds: [Schema.Types.ObjectId],
        includeFieldIds: [Schema.Types.ObjectId],
        skipGroupIds: [Schema.Types.ObjectId],
        imageUrl: String,
        article: String,
        instock: Number,
      },
    ],

    settings: {
      selectedFieldIds: [Schema.Types.ObjectId],
      availableVisibility: Boolean,
      // доступность на складе
      instock: Number,
      // в каких магазинах (номерах) товар есть в наличии
      instockPlaces: [Number],
    },
  },

  dynamic: Schema.Types.Mixed,

  creating: {
    userName: String,
    userId: Schema.Types.ObjectId,
    date: {
      type: Date,
      default: Date.now,
    },
  },

  updating: {
    userName: String,
    userId: Schema.Types.ObjectId,
    date: Date,
  },

  doneStatus: {
    type: Number,
    default: 0,
  },

  revisionStatus: {
    type: Number,
    default: 0,
  },

  collaboration: [
    {
      name: String,
      lastUpdate: Date,
    },
  ],

  seo: {
    descriptionText: String,
    descriptionTemplateId: String,
    metaDescriptionText: String,
    metaDescriptionKind: String,
  },
})

export default mongoose.model("Items2", Items)
