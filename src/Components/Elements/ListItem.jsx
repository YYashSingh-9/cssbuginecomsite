import classes from "./ListItem.module.css";
import { useDispatch } from "react-redux";
import { StoreActions } from "../../Store/CartSlice";

const ListItem = (props) => {
  const dispatch = useDispatch();
  const { id, img, price, name, totalPrice, qt } = props.items;

  //DEDUCTING PRICE OF ITEM FROM CART AS SINGLE QUANTITY
  const removeItem = () => {
    dispatch(StoreActions.removeItemHandler(id));
  };

  //ADDING PRICE ON CART TOTAL
  const addItem = () => {
    dispatch(StoreActions.addItemToCartHandler({ id, price }));
    //Sending only price and id because we dont want more quantity on the existing item on cart
  };

  //REMOVING WHOLE ITEM FROM CART
  const totalRemove = () => {
    dispatch(StoreActions.totalRemove(id));
  };
  return (
    <>
      <li key={id}>
        <div className={classes.close}>
          <p onClick={totalRemove}>X</p>
        </div>
        <div className={classes.imgDiv}>
          <img src={img} />
        </div>
        <div className={classes.product_details}>
          <h3>{name}</h3>
          <p>Happy drinking</p>
          <p>{parseFloat(totalPrice.toFixed(2))}</p>
        </div>
        <div className={classes.actions}>
          <p>${price}</p>
          <div className={classes.bitn} onClick={addItem}>
            +
          </div>
          <div className={classes.bitn} onClick={removeItem}>
            -
          </div>
        </div>
      </li>
    </>
  );
};

export default ListItem;
