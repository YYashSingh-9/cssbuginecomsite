import classes from "./MainHeader.module.css";
import logo from "../assets/soda.png";
import { useDispatch } from "react-redux";
import { StoreActions } from "../Store/CartSlice";
import { useSelector } from "react-redux";
const MainHeader = () => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  const cartToggler = () => {
    dispatch(StoreActions.cartDisplay());
  };
  return (
    <>
      <header className={classes.MainHead}>
        <div className={classes.title}>
          <img src={logo} alt="Soda logo" />
          <h1>Bloom Drinks</h1>
        </div>
        <button className={classes.titleBtn} onClick={cartToggler}>
          <h3>Cart</h3>
          <span className={classes.itemqt}>
            <p>{cartQuantity}</p>
          </span>
        </button>
      </header>
    </>
  );
};

export default MainHeader;
