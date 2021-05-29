import { Schema, model, Document } from 'mongoose'
import paginate from '@config/mongoose-paginate'

export interface IUserRentedBooks extends Document {
  user_id: string
  rented: []
}

const UserRentedBooks: Schema = new Schema(
  {
    user_id: { type: String, required: true },
    favorite: [{ type: Schema.Types.ObjectId, ref: 'Books', default: [] }],
  },
  { timestamps: true, selectPopulatedPaths: true }
)

UserRentedBooks.plugin(paginate)

module.exports = model<IUserRentedBooks>('UserRentedBooks', UserRentedBooks)
