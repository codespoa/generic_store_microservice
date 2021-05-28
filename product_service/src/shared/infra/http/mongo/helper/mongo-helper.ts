import mongoose from 'mongoose'

export const MongoHelper = {
  config: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoCreate: true,
  },

  async connect(uri: string): Promise<void> {
    return mongoose
      .connect(uri, this.config)
      .then(() => {
        console.log('\x1b[32m', '[API] MongoDB connected!')
      })
      .catch((err) => console.log('\x1b[31m', '[API] Error on connect DB', err))
  },
}
