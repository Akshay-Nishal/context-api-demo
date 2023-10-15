import React, { useContext, useEffect } from "react";
import AddProduct from "./Components/AddForm/AddProduct";
import ItemsDisplay from "./Components/DisplayItems/ItemsDisplay";
import './App.css'
import CartDisplay from "./Components/Cart/CartDisplay";
import { CartListContext } from "./Components/Context/CartContext";
import HeaderCart from "./Components/Cart/HeaderCart";
import axios from "axios";
import { ProductContext } from "./Components/Context/ProductsContext";




function App() {
  const cartCtx = useContext(CartListContext)
  const prodCtx = useContext(ProductContext)
  const getOnlineData=(urlf)=>{
    console.log("Url:",urlf)
    axios.get(`${urlf}/pruducts`)
    .then(res=>{
      // console.log(res.data)
      if(res.data.length<1){
        console.log("No Products Found")
        axios.post(`${urlf}/pruducts`,{
          products:[]
        }).then(res=>{
          console.log(res.data[0]['_id'])
          localStorage.setItem('currentProdId',res.data[0]['_id'])
          prodCtx.initaliseProduct(res.data[0]['products'])
        })
      }
      else{
        console.log(res.data[0])
        localStorage.setItem('currentProdId',res.data[0]['_id'])
        prodCtx.initaliseProduct(res.data[0]['products'])
      }
    })
    .catch(err=>console.log(err))
    axios.get(`${urlf}/cart`)
    .then(res=>{
      // console.log(res.data)
      if(res.data.length<1){
        console.log("No Cart Found")
        axios.post(`${urlf}/cart`,{
          cart:{
            items:[],
            totalCartAmount:0,
            cartNumber:0
          }
        })
        .then(res=>{
          console.log(res.data[0]['_id'])
          localStorage.setItem('currentCartId',res.data[0]['_id'])
          cartCtx.initaliseCart(res.data[0]['cart'])
        })
      }
      else{
        console.log(res.data[0])
        localStorage.setItem('currentCartId',res.data[0]['_id'])
        cartCtx.initaliseCart(res.data[0]['cart'])
      }
    })
    .catch(err=>console.log(err))
  }


  useEffect(() => {
    if(localStorage.getItem('currentAPI')){
      getOnlineData(localStorage.getItem('currentAPI'))
    }
    if(!localStorage.getItem('currentAPI')){
      let x = window.prompt('Enter CRUD Api to continue')
      // console.log("URL: ",x)
      if(x){
        localStorage.setItem('currentAPI',x)
        getOnlineData(x)
      }
    }
  }, [])


  return (
    <div className="App">
      <h1>Dispensary App</h1>
      <HeaderCart/>
      <AddProduct/>
      <ItemsDisplay/>
      <CartDisplay/>
    </div>
  );
}

export default App;
