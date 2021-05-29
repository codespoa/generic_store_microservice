import { Api } from '@shared/protocols'
import axios from 'axios'
import 'dotenv/config'

export default class GetUser implements Api {
  async handle(userId: string, userToken: string) {
    const user = await axios.get(`${process.env.USER_API}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })

    return user
  }
}
