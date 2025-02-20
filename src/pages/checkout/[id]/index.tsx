import { useRouter } from "next/router";
import CheckOut from "..";

const CheckOutId = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return;
  return <CheckOut id={id as string} />;
};

export default CheckOutId;
