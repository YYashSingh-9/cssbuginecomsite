import { createPortal } from "react-dom";
import classes from "./Cart.module.css";
import Card from "./Card";
import cartlogo from "../assets/icons8-cart-100.png";
import ListItem from "./Elements/ListItem";
import Backdrop from "./Elements/Backdrop";
import { useDispatch } from "react-redux";
import { StoreActions } from "../Store/CartSlice";
import { useSelector } from "react-redux";

const Backdroper = () => {
  return <Backdrop />;
};

const Card_w_items = (props) => {
  return (
    <Card>
      <div className={classes.title}>
        <img src={cartlogo} />
        <h2>Cart</h2>
      </div>

      <div className={classes.cartListDiv}>
        {props.items.length > 0 ? (
          <ul>
            {props.items.map((el) => {
              return (
                <ListItem
                  key={el.id}
                  items={{
                    id: el.id,
                    img: el.img,
                    name: el.name,
                    price: el.price,
                    totalPrice: el.totalPrice,
                    qt: el.quantity,
                  }}
                />
              );
            })}
          </ul>
        ) : (
          <p style={{ color: "white", fontSize: "2rem", textAlign: "center" }}>
            No items in cart
          </p>
        )}
      </div>
      <div className={classes.totalSection}>
        <div className={classes.upper}>
          <h2>SUBTOTAL</h2>
          <h3>${parseFloat(props.totalQt.toFixed(2))}</h3>
        </div>
        <div className={classes.checkoutActions}>
          <button onClick={props.onToggle}>Cancel</button>
          <button onClick={props.onToggle}>Checkout</button>
        </div>
      </div>
    </Card>
  );
};

const portalPlace = document.getElementById("backdrop");
const Cart = () => {
  const subTotal = useSelector((state) => state.cart.subTotal);
  const cartArray = useSelector((state) => state.cart.cartProducts);
  const dispatch = useDispatch();
  const cartToggler = () => {
    dispatch(StoreActions.cartDisplay());
  };

  return (
    <>
      {createPortal(<Backdroper />, portalPlace)}
      {createPortal(
        <Card_w_items
          onToggle={cartToggler}
          totalQt={subTotal}
          items={cartArray}
        />,
        portalPlace
      )}
    </>
  );
};

export default Cart;
