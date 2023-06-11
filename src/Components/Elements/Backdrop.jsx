import classes from "./Backdrop.module.css";
import { useDispatch } from "react-redux";
import { StoreActions } from "../../Store/CartSlice";

const Backdrop = () => {
  const dispatch = useDispatch();
  const cartToggler = () => {
    dispatch(StoreActions.cartDisplay());
  };
  return (
    <>
      <div className={classes.Backdrop} onClick={cartToggler}></div>
    </>
  );
};

export default Backdrop;
