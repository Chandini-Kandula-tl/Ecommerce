import { getApi } from "@/api-client/methods";
import { ManageProducts } from "@/components/ManageProduct";
import { IProduct } from "@/utils/interfaces";
import { useEffect, useState } from "react";
interface IEditProduct {
  id: string;
}
const EditProduct = ({ id }: IEditProduct) => {
  const [input, setInput] = useState<IProduct>({
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
    const response = await getApi({ endUrl: `products/${id}` });
    setInput(response?.data);
  };
  const data = {
    product_name: input.product_name,
    description: input.description,
    images: input.images,
    quantity: input.quantity,
    size_ids: input.size_ids,
    price: input.price,
    color_ids: input.color_ids,
    category_id: input.category_id,
  };
  return <ManageProducts initialValues={data} mode="Edit" id={id} />;
};

export default EditProduct;
