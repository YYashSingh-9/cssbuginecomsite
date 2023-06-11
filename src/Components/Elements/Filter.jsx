import classes from "./Filter.module.css";
import { useDispatch } from "react-redux";
import { StoreActions } from "../../Store/CartSlice";

const Filter = (props) => {
  const dispatch = useDispatch();
  const filterFunc = () => {
    // sending it for the filteration
    dispatch(StoreActions.checkHandler({ price: props.price }));
  };
  return (
    <>
      <label>
        <input
          type="checkbox"
          onChange={filterFunc}
          value={props.price}
          checked={props.checkStatus}
        />
        <span className={classes.checkmark}>${props.price}</span>
      </label>
    </>
  );
};

export default Filter;
