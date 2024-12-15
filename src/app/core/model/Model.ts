export interface IProduct  {
    EmpresaId: IEmpresa["id"]
    productId: number
    productName: string
    productPrice: number
    productDescription: string
    deliveryTimeSpan: string
    categoryId: number
    productImageUrl: string
}

export interface IEmpresa {
  id_admin: number
  name: string
  direccion: string
  id: number
  horario: string
  puntuaje: number
}

export interface APIResponseModel {
  message: string
  result: boolean
  data: any;
}

export interface CategoryModel {
  categoryId: number
  categoryName: string
  parentCategoryId: number;
}

