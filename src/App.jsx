import MainHeader from "./Components/MainHeader";
import BodyDiv from "./Components/BodyDiv";
import Cart from "./Components/Cart";
import { useSelector } from "react-redux";
function App() {
  const CartState = useSelector((state) => state.cart.stateOpen);

  return (
    <>
      <MainHeader />
      <BodyDiv />
      {CartState && <Cart />}
    </>
  );
}

export default App;
