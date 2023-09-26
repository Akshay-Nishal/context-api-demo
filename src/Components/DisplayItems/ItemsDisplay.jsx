import React, { useContext } from 'react'
import { ProductContext } from '../Context/ProductsContext'
import Item from './Item'
import './Item.css'

function ItemsDisplay() {
    const prodCtx = useContext(ProductContext)
    // console.log(prodCtx.productList)
    return (
        <div className='itemDisplay'>
        <h2>Product List</h2>
        {prodCtx.productList.map((product)=>{
            return(
                <Item key={product.name} data={product}/>
            )
        })}
    </div>
  )
}


export default ItemsDisplay