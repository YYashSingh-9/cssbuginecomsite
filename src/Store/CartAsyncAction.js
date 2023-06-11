import { StoreActions } from "./CartSlice";

//THIS IS ACTION CREATOR THUNK -> used to execute async functionality in redux toolkit.
export const sendCartItem = (dataPassed) => {
  return async (dispatch) => {
    try {
      const sendRequest = async () => {
        const response = await fetch(
          "https://e-com-a875e-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify({
              cartProducts: dataPassed.cartProducts,
              cartQuantity: dataPassed.cartQuantity,
            }),
          }
        );
        console.log("this is send function");
      };

      await sendRequest();
    } catch (err) {
      console.log("This error occured -> ", err);
    }
  };
};

export const importCartItem = () => {
  return async (dispatch) => {
    const getItem = async () => {
      const response = await fetch(
        "https://e-com-a875e-default-rtdb.firebaseio.com/cart.json"
      );
      console.log("this is import function");

      const resp2 = await response.json();
      return resp2;
    };
    try {
      const data = await getItem();
      dispatch(
        StoreActions.replaceCart({
          cartProducts: data.cartProducts ? data.cartProducts : [],
          cartQuantity: data.cartQuantity,
        })
      );
      dispatch(StoreActions.extrafunction());
    } catch (err) {
      console.log(err);
    }
  };
};
