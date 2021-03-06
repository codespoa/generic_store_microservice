export type IUpdateProductDTO = {
  id?: string
  name: string
  value: number
  weight: number
  seller: string
  store: string
  product_code?: string
  token?: string
  available?: boolean
}
