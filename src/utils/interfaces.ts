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

// export interface IProductDetails {
//   product_id: string;
//   product_name: string;
//   images: string;
//   available_sizes: string[];
//   available_colours: string[];
//   price: number;
//   category: string;
//   rating: number;
// }

export interface IUserData {
  role: string;
  email: string;
  full_name: string;
  accessToken: string;
  refreshToken: string;
}

export interface IRegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface IAuthData {
  email: string;
  password: string;
}

export interface IResetPasswordData {
  otp: string;
  password: string;
  confirmPassword: string;
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

export interface ISelectedParameters {
  categories: string[];
  color_ids: string[];
}

export interface ISelectedSizeAndColor {
  size_ids: string[];
  color_ids: string[];
}

// export interface IProduct {
//   product_id: string;
//   product_name: string;
//   images: string[];
//   available_sizes: string[];
//   available_colours: string[];
//   price: number;
//   category: string;
//   rating: number | null;
// }

export interface IProduct {
  product_id: string;
  product_name: string;
  description: string;
  images: string[];
  quantity: number;
  size_ids: string[];
  price: number;
  rating: number | null;
  color_ids: string[];
  category_id: string;
  product_status: string;
  colors: Icolor[];
  sizes: ISize[];
  category: ICategory;
}

export interface ILoginDetails {
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface IListProduct {
  product_id: string;
  product_name: string;
  description: string;
  images: string[];
  price: number;
  category_id: string;
  rating: number | null;
  quantity: number;
  size_ids: string[];
  color_ids: string[];
  sizes: string[];
  product_status: string;
}

export interface IGetProducts {
  success: string;
  products: IListProduct[];
  totalPages: number;
  current_page: string;
  total_productss: number;
}

export interface IRegistration {
  user_id: string;
}

export interface ICartResponse {
  id: number;
  user_id: string;
  product_details: ICartProduct[];
  products: ICartDetails[];
}

export interface ICartProduct {
  product_id: string;
  size_id: string;
  color_id: string;
  quantity: number;
}

export interface IProductDetails {
  product_id: string;
  product_name: string;
  description: string;
  images: string[];
  category_id: string;
  colors: Icolor[];
  sizes: ISize[];
  color_ids: string[];
  size_ids: string[];
  price: number;
  product_status: string;
  quantity: number;
  rating: null | number;
  category: ICategory;
}

export interface ICartSize {
  cart_size: number;
}

export interface IHomePageProduct {
  category_id: string;
  color_ids: string[];
  description: string;
  images: string[];
  price: number;
  product_id: string;
  product_name: string;
  product_status: string;
  quantity: number;
  rating: null | number;
  size_ids: string[];
}

export interface IOption {
  label: string;
  value: string;
}

export interface ICartDetails {
  product_id: string;
  product_name: string;
  images: string[];
  price: number;
  category_id: string;
  size: ISize;
  quantity: number;
  color: Icolor;
}

export interface IAddress {
  firstName: string;
  lastName: string;
  address: string;
  optionalAddress: string;
  city: string;
  country: string;
  zipCode: number;
  optionalText: string;
}

export interface IAddressData {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  pincode: string;
  country: string;
  mobile: string;
  optional_text: string;
}

export interface IPayment {
  data: any;
}

export interface PaymentIntentData {
  id: string;
  object: string;
  amount: number;
  amount_capturable: number;
  amount_details: {
    tip: Record<string, unknown>;
  };
  amount_received: number;
  application: string | null;
  application_fee_amount: number | null;
  automatic_payment_methods: {
    allow_redirects: string;
    enabled: boolean;
  };
  canceled_at: number | null;
  cancellation_reason: string | null;
  capture_method: string;
  client_secret: string;
  confirmation_method: string;
  created: number;
  currency: string;
  customer: string | null;
  description: string | null;
  invoice: string | null;
  last_payment_error: string | null;
  latest_charge: string | null;
  livemode: boolean;
  metadata: {
    order_id: string;
    user_id: string;
  };
  next_action: string | null;
  on_behalf_of: string | null;
  payment_method: string | null;
  payment_method_configuration_details: string | null;
  payment_method_options: {
    card: {
      installments: string | null;
      mandate_options: string | null;
      network: string | null;
      request_three_d_secure: string;
    };
  };
  payment_method_types: string[];
  processing: string | null;
  receipt_email: string | null;
  review: string | null;
  setup_future_usage: string | null;
  shipping: string | null;
  source: string | null;
  statement_descriptor: string | null;
  statement_descriptor_suffix: string | null;
  status: string;
  transfer_data: string | null;
  transfer_group: string | null;
}

// export interface ICartDetails{
//   product_id: string;
//   color_id: string;
//   size_id: string;
//   image: string;
//   productName: string;
//   size: string;
//   quantity: string;
//   cost: string;
// }[];
