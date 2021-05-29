import { Decoder, ReturnDecode } from '@shared/adapter'
import jwt_decode from 'jwt-decode'

export default class JwtDecode implements Decoder {
  decode(token: string): ReturnDecode {
    if (token) {
      const tokenDecoded = jwt_decode(token)

      const { subject, exp, iat } = tokenDecoded as any

      return {
        subject,
        exp,
        iat,
      }
    }

    return null
  }
}
