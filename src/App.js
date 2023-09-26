import React, { useContext } from "react";
import AddProduct from "./Components/AddForm/AddProduct";
import ItemsDisplay from "./Components/DisplayItems/ItemsDisplay";
import './App.css'
import CartDisplay from "./Components/Cart/CartDisplay";
import { CartListContext } from "./Components/Context/CartContext";
import HeaderCart from "./Components/Cart/HeaderCart";


function App() {
  const cartCtx =  useContext(CartListContext)
  return (
    <div className="App">
      <h1>Products App</h1>
      <HeaderCart/>
      <AddProduct/>
      <ItemsDisplay/>
      <CartDisplay/>
    </div>
  );
}

export default App;
