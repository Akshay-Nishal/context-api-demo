import React from 'react'
import './Cart.css'

export default function CartItem(props) {
    // console.log("Herer",props.data);
    const item = props.data
  return (
    <div className='cartItem'>
        <p className='itemName'>{item.name}</p>
        <p className='itemCounts'>{item.quantity}</p>
        <p className='itemAmount'>$ {item.totalAmount}</p>
    </div>
  )
}

//   {item.name}
//   {item.large>0?`${item.large}L`:''} 
//   {item.medium>0?`${item.medium}M`:''} 
//   {item.small>0?`${item.small}S`:''} 
//   ${item.totalAmount}