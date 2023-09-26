import React, { useContext } from 'react'
import { CartListContext } from '../Context/CartContext'
import './Cart.css'

export default function HeaderCart() {
    const cartCtx = useContext(CartListContext)
  return (
    <div className='cartButton'>
        <button>
            <img src="https://imgs.search.brave.com/gXr9D8oWRvlOjirHDIBt1lRu43ceinFd5c2wAmHsGFA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4w/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZmF0aWNvbnMt/Mi8zMS9jYXJ0NC0x/MjgucG5n" alt="Cart" />
            <b> : {cartCtx.cartNumber}</b>
        </button>
    </div>
  )
}
