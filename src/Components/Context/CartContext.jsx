import React, { useReducer, useState } from "react";

export const CartListContext = React.createContext({
    cartList : [],
    cartNumber : null,
    totalAmount : null,
    onAdd:(item)=>{},
    onOrder:()=>{}
})

// const defaultCart ={
//     items:[
//         {name:'Adidas',price:250,large:0,medium:2,small:1,totalAmount:750},
//         {name:'Bata',price:50,large:1,medium:0,small:1,totalAmount:100}
//     ],
//     totalCartAmount:850,
//     cartNumber:5
// }
const defaultCart ={
    items:[],
    totalCartAmount:0,
    cartNumber:0
}

const cartReducer = (state,action) => {
    // console.log("Add Called");
    if(action.type==='Add'){
        const updatedCartNumber = state.cartNumber+1
        const updatedTotalAmount = state.totalCartAmount + action.item.price
        let newList = state.items

        let ind = state.items.findIndex((it)=>it.name===action.item.name)
        if(ind!==-1){
            let updateItem = newList[ind]
            if(action.item.size==='large'){
                updateItem.large=updateItem.large+1
            }
            if(action.item.size==='medium'){
                updateItem.medium=updateItem.medium+1
            }
            if(action.item.size==='small'){
                updateItem.small=updateItem.small+1
            }
            updateItem.totalAmount+=action.item.price
            // console.log(updateItem);
            newList[ind]=updateItem
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
                large:0,
                medium:0,
                small:0,
                totalAmount:action.item.price
            }
            if(action.item.size==='large'){
                newItem.large=newItem.large+1
            }
            if(action.item.size==='medium'){
                newItem.medium=newItem.medium+1
            }
            if(action.item.size==='small'){
                newItem.small=newItem.small+1
}
            console.log(newItem)
            newList.push(newItem)
            console.log(newList);
            return{
                items:newList,
                totalCartAmount:updatedTotalAmount,
                cartNumber:updatedCartNumber
            }
        }
    }
    if(action.type==='Order'){
        return{
            items:[],
            totalCartAmount:0,
            cartNumber:0
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


    
    const values = {
        cartList : cartState.items,
        cartNumber : cartState.cartNumber,
        totalAmount : cartState.totalCartAmount,
        onAdd : addItem,
        onOrder : placeOrder}

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