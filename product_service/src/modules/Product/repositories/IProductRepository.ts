import {
  ICreateProductDTO,
  IReturnProductDTO,
  IUpdateProductDTO,
  IReturnUpdateProductDTO,
} from '@modules/Product/dtos'

export default interface IProductRepository {
  getAll(payload: any): Promise<IReturnProductDTO[]> | undefined
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
  getAllByCode(
    code: string
  ): Promise<IReturnProductDTO[] | IReturnProductDTO> | undefined
}
