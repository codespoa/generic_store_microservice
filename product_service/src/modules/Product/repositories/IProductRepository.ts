import ICreateProductDTO from '@modules/Product/dtos/ICreateProductDTO'
import IReturnProductDTO from '@modules/Product/dtos/IReturnProductDTO'

export default interface IProductRepository {
  getAll(): Promise<IReturnProductDTO[]> | undefined
  findByCode(code: string): Promise<IReturnProductDTO | undefined>
  create({
    name,
    value,
    weight,
    seller,
    store,
    product_code,
  }: ICreateProductDTO): Promise<IReturnProductDTO>
}
