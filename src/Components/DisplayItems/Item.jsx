import React, { useContext } from 'react'
import { CartListContext } from '../Context/CartContext'
import { ProductContext } from '../Context/ProductsContext'

function Item(props) {
    const prod = props.data
    // console.log(prod.large);
    const cartCtx = useContext(CartListContext)
    const prodCtx = useContext(ProductContext)
    const addToCartHandler = () =>{
        let tem = {
            name:prod.name,
            price:prod.price
        }
        cartCtx.onAdd(tem)
        prodCtx.onPurchaseProduct(tem)
    }
  return (
    <div className='item'>
        <div className='item-details flex' >
        <p>{prod.name}</p>
        <p>{prod.description}</p>
        <p>$ {prod.price}</p>
        <p>{prod.quantity<1? 'Out of stock': prod.quantity}</p>
        </div>
        <div className='buy-item flex'>
          <button onClick={addToCartHandler} disabled={prod.quantity<1}>Buy 1</button>
        </div>
    </div>
  )
}

export default Item
