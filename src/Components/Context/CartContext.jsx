import axios from "axios";
import React, { useReducer, useState } from "react";


export const CartListContext = React.createContext({
    cartList : [],
    cartNumber : null,
    totalAmount : null,
    onAdd:(item)=>{},
    onOrder:()=>{},
    initaliseCart:(items)=>{}
})

// const defaultCart ={
//     items:[
//         {name:'PCM',price:50,quantity:5,totalAmount:250},
//         {name:'Dolo',price:15,quantity:2,totalAmount:30}
//     ],
//     totalCartAmount:280,
//     cartNumber:7
// }
const defaultCart ={
    items:[],
    totalCartAmount:0,
    cartNumber:0
}

const updateCartApi=(list)=>{
    axios.put(`${localStorage.getItem('currentAPI')}/cart/${localStorage.getItem('currentCartId')}`,
    {
        cart:list
    })
    .then(res=>{
        console.log(res.data)
    })

}

const cartReducer = (state,action) => {
    // console.log("Add Called");
    if(action.type==='Add'){
        const updatedCartNumber = state.cartNumber+1
        const updatedTotalAmount = parseInt(state.totalCartAmount) + parseInt(action.item.price)
        let newList = state.items

        let ind = state.items.findIndex((it)=>it.name===action.item.name)
        if(ind!==-1){
            let updateItem = newList[ind]
            updateItem.quantity=updateItem.quantity+1

            updateItem.totalAmount= parseInt(updateItem.totalAmount)+parseInt(action.item.price)
            // console.log(updateItem);
            newList[ind]=updateItem
            let upCart = {
                items:newList,
                totalCartAmount:updatedTotalAmount,
                cartNumber:updatedCartNumber
            }
            updateCartApi(upCart)
            return{
                items:newList,
                totalCartAmount:updatedTotalAmount,
                cartNumber:updatedCartNumber
            }
        }
        if(ind===-1){
            console.log("Not Found")
            const newItem={
                name:action.item.name,
                price:action.item.price,
                quantity:0,
                totalAmount:action.item.price
            }
            newItem.quantity=newItem.quantity+1

            console.log(newItem)
            newList.push(newItem)
            console.log(newList);
            let upCart = {
                items:newList,
                totalCartAmount:updatedTotalAmount,
                cartNumber:updatedCartNumber
            }
            updateCartApi(upCart)
            return{
                items:newList,
                totalCartAmount:updatedTotalAmount,
                cartNumber:updatedCartNumber
            }
        }
    }
    if(action.type==='Order'){
        let upCart = {
            items:[],
            totalCartAmount:0,
            cartNumber:0
        }
        updateCartApi(upCart)
        return{
            items:[],
            totalCartAmount:0,
            cartNumber:0
        }
    }
    if(action.type==='InitaliseCart'){
        return{
            items:action.items.items,
            totalCartAmount:action.items.totalCartAmount,
            cartNumber:action.items.cartNumber
        }
    }
    return(defaultCart)
}

export const CartListProvider = ({children})=>{

    const [cartState,dispatchState]=useReducer(cartReducer,defaultCart)

    const addItem = (item) =>{
        dispatchState({type:'Add',item:item})
    }
    const placeOrder = () =>{
        dispatchState({type:'Order'})
    }
    const setCart=(items)=>{
        dispatchState({type:'InitaliseCart',items:items})
    }


    
    const values = {
        cartList : cartState.items,
        cartNumber : cartState.cartNumber,
        totalAmount : cartState.totalCartAmount,
        onAdd : addItem,
        onOrder : placeOrder,
        initaliseCart : setCart
    }

    return <CartListContext.Provider value={values}>{children}</CartListContext.Provider>
}






// {        let ind = state.items.findIndex((it)=>it.id===action.item.id)
//     console.log(ind)
//     let newList
//     // console.log(action.item);
//     if(ind===-1){
//         newList = state.items.concat(action.item)
//     }
//     else{
//         let updatedItems = state.items
//         let updatedItem = state.items[ind]
//         updatedItem.amount=updatedItem.amount+action.item.amount
//         updatedItems[ind]=updatedItem
//         newList=updatedItems

//     }
//     const newTotalAmount = state.totalAmount + action.item.price*action.item.amount
//     const newCartNumber = state.cartNumber+action.item.amount
//     console.log(newList)
//     return{
//         items:newList,
//         totalAmount:newTotalAmount,
//         cartNumber:newCartNumber
//     }}