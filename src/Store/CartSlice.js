import { createSlice, current } from "@reduxjs/toolkit";

//THE PRODUCTS __
const DUMMY_PRODUCTS = [
  {
    id: 1,
    quantity: 1,
    name: "Drink 1",
    price: 2.2,
    img: "https://images.unsplash.com/photo-1598038990523-32bcaa29f679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 2,
    quantity: 1,
    name: "Drink 2",
    price: 1.23,
    img: "https://images.unsplash.com/photo-1543253687-c931c8e01820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80",
  },
  {
    id: 3,
    quantity: 1,
    name: "Drink 3",
    price: 1.23,
    img: "https://images.unsplash.com/photo-1630404365865-97ff92feba6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },
  {
    id: 4,
    quantity: 1,
    name: "Drink 4",
    price: 2.0,
    img: "https://images.unsplash.com/photo-1613208602577-50fd21015cca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 5,
    quantity: 1,
    name: "Drink 5",
    price: 1.9,
    img: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 6,
    quantity: 1,
    name: "Drink 6",
    price: 1.5,
    img: "https://images.unsplash.com/photo-1630336282058-d65c8d5af2ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=691&q=80",
  },
  {
    id: 7,
    quantity: 1,
    name: "Drink 7",
    price: 1.3,
    img: "https://images.unsplash.com/photo-1607811121079-c33f75be7781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 8,
    quantity: 1,
    name: "Drink 8",
    price: 1.0,
    img: "https://images.unsplash.com/photo-1596793453600-adeef0163df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
];

//FILTER CHECK ARRAY
const arrayFC = [
  { price: 2.2, checked: false },
  { price: 1.23, checked: false },
  { price: 1.7, checked: false },
  { price: 1.9, checked: false },
  { price: 1.5, checked: false },
  { price: 1.3, checked: false },
  { price: 1, checked: false },
  { price: 9, checked: false },
];

//ALL STATES__ OF THE SLICE
const initState = {
  stateOpen: false,
  products: DUMMY_PRODUCTS, // NON MUTABLE CONSTANT PRODUCTS ARRAY
  cartProducts: [],
  filteredProducts: DUMMY_PRODUCTS, // MUTABLE ARRAY TO SHOW PRODUCTS AS PER THE FILTER PRICES
  cartQuantity: 0, //TO SHOW NUMBER OF PRODUCTS ON CART ICON
  subTotal: 0, // FOR TOTAL
  filtercheckArray: arrayFC,
  heeh: false,
};

//MAIN SLICE__
const sliceOne = createSlice({
  name: "sliceOne",
  initialState: initState,
  reducers: {
    //DISPLAYING CART
    cartDisplay(state) {
      state.stateOpen = !state.stateOpen;
    },
    //REPLACE CART AFTER FETCHING DATA FROM FIREBASE
    replaceCart(state, action) {
      state.cartProducts = action.payload.cartProducts;
      state.cartQuantity = action.payload.cartQuantity;
      console.log("this is replacecart");
    },
    extrafunction(state, action) {
      let total = 0;
      for (const key of state.cartProducts) {
        total += key.totalPrice;
        console.log(total);
      }
      state.subTotal = total;
    },
    // ADDING ITEM TO CART
    addItemToCartHandler(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartProducts.find(
        (el) => el.id === newItem.id
      );
      console.log("ran 1");
      state.cartQuantity++;
      console.log("ran 2");

      if (!existingItem) {
        state.cartProducts.push({
          id: newItem.id,
          price: newItem.price,
          name: newItem.name,
          img: newItem.img,
          totalPrice: newItem.price,
          quantity: 1,
        });
        console.log("ran 3");

        const updatedTotal = state.subTotal + newItem.price * newItem.qt;
        state.subTotal = parseFloat(updatedTotal.toFixed(2)); // this is used to remove zeros after decimals
      } else {
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        existingItem.quantity++;
        const updatedTotal = state.subTotal + newItem.price;
        state.subTotal = parseFloat(updatedTotal.toFixed(2)); // important logic here is written and attached
      }
    },

    //REMOVE AN ITEM FROM CART
    removeItemHandler(state, action) {
      const itemToRemoveId = action.payload;
      const Existingitem = state.cartProducts.find(
        (el) => el.id === itemToRemoveId
      );

      state.cartQuantity--;
      state.subTotal = state.subTotal - Existingitem.price;
      if (Existingitem.quantity === 1) {
        state.cartProducts = state.cartProducts.filter(
          (el) => el.id !== Existingitem.id
        );
      } else {
        Existingitem.quantity--;
        Existingitem.totalPrice = Existingitem.totalPrice - Existingitem.price;
      }
    },

    //REMOVING ALL ITEMS FROM CART
    totalRemove(state, action) {
      const itemToRemoveId = action.payload;
      const Existingitem = state.cartProducts.find(
        (el) => el.id === itemToRemoveId
      );
      state.cartQuantity = state.cartQuantity - Existingitem.quantity;
      state.subTotal = state.subTotal - Existingitem.totalPrice;
      if (Existingitem) {
        state.cartProducts = state.cartProducts.filter(
          (el) => el.id !== Existingitem.id
        );
      }
    },

    //PRODUCT FILTER LOGIC -> CHECK STATUS___ v_important!!
    checkHandler(state, action) {
      const pricePassed = action.payload.price;
      //checking same price and changing checked status..
      const changeObject = state.filtercheckArray.map((el) => {
        console.log("this is");
        return el.price === pricePassed ? { ...el, checked: !el.checked } : el;
      });
      state.filtercheckArray = changeObject;
    },

    //PRODUCT FILTER LOGIC -> CHANGING PRODUCTS
    filteration(state, action) {
      let list = state.products; // Non changing products array..
      //extracting and mapping array of prices of the checked objects
      const checkedProducts = state.filtercheckArray
        .filter((elem) => elem.checked)
        .map((elem) => elem.price);

      if (checkedProducts.length) {
        list = list.filter((elem) => {
          return checkedProducts.includes(elem.price);
        });
      }
      // The filter() method creates a new array filled with elements that pass a test provided by a function.
      // Detailed explaination of checkbox filtering attached ...
      state.filteredProducts = list; // mutating this array which shows products
    },
  },
});
export const StoreActions = sliceOne.actions;

export default sliceOne;
