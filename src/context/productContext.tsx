import { getApi } from "@/api-client/methods";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface ICart {
  cartCount: number;
  productIds: string[];
}

interface ICartAction {
  type:
    | "ADD_CART"
    | "SYNC_API"
    | "REMOVE_BUTTON"
    | "MANAGE_AMOUNT"
    | "UPDATE_ADDRESS"
    | "UPDATE_SHIPPING"
    | "ORDER_DATA";
  payload: any;
}

const intialState = {
  cart: { cartCount: 0, productIds: [], amount: 0 },
  product: {
    selectedProduct: {},
  },
  checkout: { address: {}, shipping: {}, payment: {} },
  orderData: {},
};

const calculateAmount = (products: any) => {
  return products.reduce((total: number, item: any) => {
    const itemTotal = item.price * item.quantity;
    return total + itemTotal;
  }, 0);
};

const cartReducer = (state: any, action: ICartAction) => {
  switch (action.type) {
    case "ADD_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartCount: action.payload,
          //   productIds: [...state.cart.productIds, action.payload],
        },
      };

    case "SYNC_API":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartCount: action?.payload?.length,
          // cartCount: action.payload,
          // productIds: action.payload,
        },
      };
    case "REMOVE_BUTTON":
      return {
        ...state,
        cart: { ...state.cart, cartCount: state.cart.cartCount - 1 },
      };
    case "MANAGE_AMOUNT":
      return {
        ...state,
        cart: {
          ...state.cart,
          amount: calculateAmount(action.payload),
        },
      };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          address: action.payload,
        },
      };
    case "UPDATE_SHIPPING":
      return {
        ...state,
        checkout: {
          ...state.checkout,
          shipping: action.payload.shipping,
        },
      };
    case "ORDER_DATA":
      return {
        ...state,
        orderData: action.payload,
      };
    default:
      return state;
  }
};

const CartContext = createContext<any>(null);

interface ConceptsContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({
  children,
}: ConceptsContextProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, intialState);
  const router = useRouter();
  let currentPath = router.pathname;

  const getCartProducts = async () => {
    try {
      const response = await getApi({
        endUrl: "user/cart",
      });
      dispatch({ type: "SYNC_API", payload: response?.data?.product_details });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <div>
      <CartContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
}

export function useTotalContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error(
      "useClipBoard must be used within a ConceptsContextProvider"
    );
  }
  return context;
}
