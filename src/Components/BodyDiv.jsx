// IMPORTS___
import { useDispatch, useSelector } from "react-redux";
import classes from "./BodyDiv.module.css";
import Li from "./Elements/Li";
import Filter from "./Elements/Filter";
import { useEffect } from "react";
import { StoreActions } from "../Store/CartSlice";
import { sendCartItem, importCartItem } from "../Store/CartAsyncAction";

let initialState = true;

const BodyDiv = () => {
  //THE ALL PRODUCTS ARRAY__
  const productsArray = useSelector((state) => state.cart.filteredProducts);
  //THIS FILTERING ARRAY IS ID AND PRICE ARRAY TO GET WHAT TO FILTER__
  const filteringArray = useSelector((state) => state.cart.filtercheckArray);
  const cartArray = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //______________

  useEffect(() => {
    dispatch(importCartItem());

    console.log("this is replacer");
  }, [dispatch]);

  useEffect(() => {
    dispatch(StoreActions.filteration());
    console.log("This is useeffect");
  }, [filteringArray]);

  useEffect(() => {
    if (initialState) {
      initialState = false;
      return;
    }
    dispatch(sendCartItem(cartArray));
    console.log("This is useeffect2");
  }, [cartArray, dispatch]);

  return (
    <>
      <section className={classes.MainDiv}>
        <section className={classes.filter}>
          <span className={classes.title}>Select Size</span>
          <div className={classes.filterDiv}>
            {filteringArray.map((el) => {
              return (
                <Filter
                  key={el.price}
                  price={el.price}
                  checkedStatus={el.checked}
                />
              );
            })}
          </div>
          <div className={classes.info}>
            <h3>
              This is lorem ipsum wala text pura ka pura padhne ki zarurat nahi
              hai
            </h3>
            <a href="#">
              <p>Star</p>
            </a>
          </div>
        </section>
        <ul className={classes.productGrid}>
          {productsArray.map((el) => {
            return (
              <Li
                key={el.id}
                id={el.id}
                name={el.name}
                price={el.price}
                img={el.img}
                qt={el.quantity}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default BodyDiv;
