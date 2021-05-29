type UserObject = {
  user_id: string
  user_role: string
}

export type ReturnDecode = {
  subject: UserObject
  exp: string
  iat: number
}

export interface Decoder {
  decode(token: string): ReturnDecode
}
