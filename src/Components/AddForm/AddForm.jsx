import React, { useContext, useRef } from 'react'
import './Add.css'
import { ProductContext } from '../Context/ProductsContext'


export default function AddForm() {
    const prodCtx = useContext(ProductContext)
    const nameRef = useRef()
    const descRef = useRef()
    const priceRef = useRef()
    const larRef = useRef()
    const medRef = useRef()
    const smlRef = useRef()
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
        let enteredlarge       = larRef.current.value 
        let enteredmedium      = medRef.current.value 
        let enteredsmall       = smlRef.current.value
        if(enteredname && entereddescription && enteredprice && enteredlarge && enteredmedium && enteredsmall){
            let item = {
                name: enteredname,
                description: entereddescription,
                price : enteredprice,
                large : enteredlarge,
                medium : enteredmedium,
                small : enteredsmall
            }
            prodCtx.onAddProduct(item)
            nameRef.current.value  =''
            descRef.current.value  =''
            priceRef.current.value =''
            larRef.current.value   =''
            medRef.current.value   =''
            smlRef.current.value   =''
 
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
        <div className='product-price'>
            <p>Quantity</p>
            <div className='quantity-inputs'>
                <div className='size-input'>
                    <label htmlFor="large">L</label>
                    <input  
                    ref={larRef} 
                    id='large' 
                    // value={10} 
                    min={1} max={20} 
                    type="number" 
                    />
                </div>
                <div className='size-input'>
                    <label htmlFor="medium">M</label>
                    <input 
                    ref={medRef} 
                    id='medium' 
                    // value={10}
                    min={1} max={20} 
                    type="number" 
                    />
                </div>
                <div className='size-input'>
                    <label htmlFor="small">S</label>
                    <input  
                    ref={smlRef} 
                    id='small' 
                    // value={10}
                    min={1} max={20} 
                    type="number" />
                </div>
            </div>
        </div>
        <button type='submit'>Add Product</button>
    </form>
  )
}
