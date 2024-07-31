import { getApi } from "@/api-client/methods";
import { ManageProducts } from "@/components/ManageProduct";
import { IProduct, IProductDetails } from "@/utils/interfaces";
import { useEffect, useState } from "react";
interface IEditProduct {
  id: string;
}
const EditProduct = ({ id }: IEditProduct) => {
  const [productDetails, setProductDetails] = useState<IProduct>({
    product_id: "",
    product_name: "",
    description: "",
    images: [],
    quantity: 0,
    size_ids: [],
    price: 0,
    rating: null,
    color_ids: [],
    category_id: "",
    product_status: "",
    colors: [],
    sizes: [],
    category: { category_id: "", category_name: "" },
  });

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    const response = await getApi<IProductDetails>({
      endUrl: `products/${id}`,
    });
    setProductDetails(response?.data);
  };
  const data = {
    product_name: productDetails.product_name,
    description: productDetails.description,
    images: productDetails.images,
    quantity: productDetails.quantity,
    size_ids: productDetails.size_ids,
    price: productDetails.price,
    color_ids: productDetails.color_ids,
    category_id: productDetails.category_id,
  };
  return <ManageProducts initialValues={data} mode="Edit" id={id} />;
};

export default EditProduct;
