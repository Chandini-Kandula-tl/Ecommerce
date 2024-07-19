export interface IApi {
  data?: any;
  endUrl: string;
  params?: any;
  accessKey?: string;
  headers?: string;
}

export interface IAddProduct {
  product_name: string;
  images: string[];
  quantity: number;
  size_ids: string[];
  price: number;
  color_ids: string[];
  category_id: string;
  description: string;
}

export interface IProductDetails {
  product_id: string;
  product_name: string;
  images: string;
  available_sizes: string[];
  available_colours: string[];
  price: number;
  category: string;
  rating: number;
}

export interface IUserData {
  role: string;
  email: string;
  full_name: string;
  accessToken: string;
  refreshToken: string;
}

export interface IApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface Icolor {
  color_id: string;
  color_name: string;
  color_code: string;
}

export interface ISize {
  size_id: string;
  size_type: string;
}

export interface ICategory {
  category_id: string;
  category_name: string;
}

export interface IProductParameters {
  colors: Icolor[];
  sizes: ISize[];
  categories: ICategory[];
}

export interface IProduct {
  product_id: string;
  product_name: string;
  images: string[];
  available_sizes: string[];
  available_colours: string[];
  price: number;
  category: string;
  rating: number;
}

export interface ILoginDetails {
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface IHomePageProduct {
  category_id: string;
  color_ids: string[];
  createdAt: string;
  created_by: null | string;
  deletedAt: null | string;
  description: string;
  images: string[];
  price: number;
  product_id: string;
  product_name: string;
  product_status: string;
  quantity: number;
  rating: null | number;
  size_ids: string[];
  updatedAt: string;
  updated_by: null | string;
}

export interface IOption {
  label: string;
  value: string;
}
