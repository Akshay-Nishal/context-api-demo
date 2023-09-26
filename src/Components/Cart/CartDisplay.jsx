import React, { useContext } from 'react'
import { CartListContext } from '../Context/CartContext'
import CartItem from './CartItem'
function CartDisplay() {
    const cartCtx = useContext(CartListContext)
    const placeOrder = () =>{
        window.alert("Order Placed Successfully!!!")
        cartCtx.onOrder()
    }
    // console.log(cartCtx.cartList)
    return (
        <div className='cartDisplay'>
        <h2>Cart</h2>
        {cartCtx.cartList.length>0?
        <>
        {cartCtx.cartList.map((item)=>{
            return <CartItem key={item.name} data={item}/>
        })}
        <div>
            <b>Total Amount : ${cartCtx.totalAmount}</b>
            <button onClick={placeOrder}>Place Order</button>
        </div>
        </>
        :
        <b>Cart Empty, Add Procuts!!!</b>
        }
    </div>
  )
}

export default CartDisplay

