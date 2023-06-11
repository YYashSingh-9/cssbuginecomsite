import classes from "./Li.module.css";
import { useDispatch } from "react-redux";
import { StoreActions } from "../../Store/CartSlice";

const Li = (props) => {
  const dispatch = useDispatch();
  const { qt, id, img, name, price } = props;

  const addItemHandler = () => {
    dispatch(StoreActions.addItemToCartHandler({ qt, id, img, name, price }));
  };

  return (
    <li key={id} className={classes.listItem}>
      <div className={classes.imgDiv}>
        <img src={img} />
      </div>
      <h3>{name}</h3>
      <p>{price}</p>
      <button onClick={addItemHandler}>Add To Cart</button>
    </li>
  );
};

export default Li;
