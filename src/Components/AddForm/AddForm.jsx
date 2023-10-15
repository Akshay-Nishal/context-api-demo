import React, { useContext, useRef } from 'react'
import './Add.css'
import { ProductContext } from '../Context/ProductsContext'


export default function AddForm() {
    const prodCtx = useContext(ProductContext)
    const nameRef = useRef()
    const descRef = useRef()
    const priceRef = useRef()
    const quanRef = useRef()
    const addProductHandler = (event) =>{
        event.preventDefault()
        // console.log("Submit")
        // console.log("Name ",nameRef.current.value);
        // console.log("Desc ",descRef.current.value);
        // console.log("Price ",priceRef.current.value);
        // console.log("Lar ",larRef.current.value);
        // console.log("Med ",medRef.current.value);
        // console.log("Sml ",smlRef.current.value);

        let enteredname        = nameRef.current.value
        let entereddescription = descRef.current.value 
        let enteredprice       = priceRef.current.value
        let enteredQuan       = quanRef.current.value
        if(enteredname && entereddescription && enteredprice && enteredQuan){
            let item = {
                name: enteredname,
                description: entereddescription,
                price : enteredprice,
                quantity : enteredQuan,
            }
            prodCtx.onAddProduct(item)
            nameRef.current.value  =''
            descRef.current.value  =''
            priceRef.current.value =''
            quanRef.current.value   =''
 
        }
        else{
            window.alert("Please Enter All Values!!!")
        }
        
    }
  return (
    <form onSubmit={addProductHandler}>
        <div className='product-name main-input'>
            <label htmlFor="name">Product Name</label>
            <input 
            ref={nameRef} 
            id='name' 
            type="text" 
            // value={'Shoe'}
            />
        </div>
        <div className='product-description main-input'>
            <label htmlFor="description">Description</label>
            <input 
            ref={descRef} 
            id='description' 
            type="text"
            // value={'About Shoe'} 
            />
        </div>
        <div className='product-price main-input'>
            <label htmlFor="price">Price</label>
            <input 
            ref={priceRef} 
            id='price' 
            type="number"  
            // value={160}
            />
        </div>
        <div className='product-quantity main-input'>
            <label htmlFor="quantity">Quantity</label>
            <input 
            ref={quanRef} 
            id='quantity' 
            type="number"  
            // value={160}
            />
        </div>
        <button type='submit'>Add Medicine</button>
    </form>
  )
}
