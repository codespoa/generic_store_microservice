import ICreateProductDTO from '@modules/Product/dtos/ICreateProductDTO'
import IReturnProductDTO from '@modules/Product/dtos/IReturnProductDTO'
import IUpdateProductDTO from '@modules/Product/dtos/IUpdateProductDTO'
import IReturnUpdateProductDTO from '@modules/Product/dtos/IReturnUpdateProductDTO'

export default interface IProductRepository {
  getAll(): Promise<IReturnProductDTO[]> | undefined
  findByCode(code: string): Promise<IReturnProductDTO | undefined>
  findById(id: string): Promise<IReturnProductDTO | undefined>
  update(
    id: string,
    payload: IUpdateProductDTO
  ): Promise<IReturnUpdateProductDTO>
  create({
    name,
    value,
    weight,
    seller,
    store,
    product_code,
  }: ICreateProductDTO): Promise<IReturnProductDTO>
}
