import { Schema, model } from 'mongoose'
import paginate from '@config/mongoose-paginate'

const Product: Schema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    weight: { type: Number, required: true },
    seller: { type: String, required: true },
    store: { type: String, required: true },
    product_code: { type: String, required: true },
  },
  { timestamps: true, selectPopulatedPaths: true }
)

Product.plugin(paginate)

export default model('Product', Product)
