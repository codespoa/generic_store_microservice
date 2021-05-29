import { Schema, model } from 'mongoose'
import paginate from '@config/mongoose-paginate'

const User: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true },
  },
  { timestamps: true, selectPopulatedPaths: true }
)

User.plugin(paginate)

export default model('User', User)
