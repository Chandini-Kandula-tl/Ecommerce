import { useRouter } from "next/router";
import EditProduct from "..";
const EditProductId = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return;
  return <EditProduct id={id as string} />;
};

export default EditProductId;
