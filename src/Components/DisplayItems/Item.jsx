import React, { useContext } from 'react'
import { CartListContext } from '../Context/CartContext'
import { ProductContext } from '../Context/ProductsContext'

function Item(props) {
    const prod = props.data
    // console.log(prod.large);
    const cartCtx = useContext(CartListContext)
    const prodCtx = useContext(ProductContext)
    const addToCartHandler = (siz) =>{
        // console.log("Selected Size : ",siz)
        // console.log("Selected Product : ",prod.name)
        let tem = {
            name:prod.name,
            price:prod.price,
            size:siz
        }
        cartCtx.onAdd(tem)
        prodCtx.onPurchaseProduct(tem)
    }
  return (
    <div className='item'>
        <div className='item-details flex' >
        <p>{prod.name}</p>
        <p>{prod.description}</p>
        <p>{prod.price}</p>
        </div>
        <div className='buy-item flex'>
        <button disabled={prod.large<=0} onClick={()=>addToCartHandler('large')} >Buy L ({prod.large})</button>
        <button disabled={prod.medium<=0}  onClick={()=>addToCartHandler('medium')} >Buy M ({prod.medium})</button>
        <button disabled={prod.small<=0}  onClick={()=>addToCartHandler('small')} >Buy S ({prod.small})</button>
        </div>
    </div>
  )
}

export default Item
