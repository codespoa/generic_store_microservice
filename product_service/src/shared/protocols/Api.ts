type ReturnUser = {
  _id: string
  name: string
  email: string
  password: string
  role: string
}

export interface Api {
  handle(userId: string, userToken: string): Promise<any>
}
