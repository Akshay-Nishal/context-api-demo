import axios from "axios";
import { createContext, useReducer } from "react";

export const ProductContext = createContext(
    {
        productList : [],
        onAddProduct:(item)=>{},
        onPurchaseProduct:(item)=>{},
        initaliseProduct:(item)=>{}
    }
)

const defaultProducts ={
    products:[]
}

const updateProductsApi=(list)=>{
    axios.put(`${localStorage.getItem('currentAPI')}/pruducts/${localStorage.getItem('currentProdId')}`,
    {
        products:list
    })
    .then(res=>{
        console.log(res.data)
    })

}

const productReducer = (state,action) =>{
    if(action.type==='Add'){
        console.log(action.item)
        const newList = state.products.concat(action.item)
        updateProductsApi(newList)
        return{
            products:newList
        }
    }
    if(action.type==='Initalise'){
        return{
            products:action.products
        }
    }
    if(action.type==='Purchase'){
        console.log("Purchased : ",action.item)
        let ind = state.products.findIndex((it)=>it.name===action.item.name)
        console.log(ind);
        let newList = state.products
        let updatedProduct = newList[ind]
        updatedProduct.quantity=updatedProduct.quantity-1
        newList[ind]=updatedProduct
        updateProductsApi(newList)
        return{
            products:newList
        }

    }
    return(defaultProducts)
}

export const ProductProvider =({children})=>{
    const [listState,dispatchState] = useReducer(productReducer,defaultProducts)

    const addProduct = (item) =>{
        dispatchState({type:'Add',item:item})
    }
    const purchaseProduct = (item) =>{
        dispatchState({type:'Purchase',item:item})
    }
    const setProduct =(items)=>{
        dispatchState({type:'Initalise',products:items})
    }

    const values={
        productList : listState.products,
        onAddProduct : addProduct,
        onPurchaseProduct : purchaseProduct,
        initaliseProduct : setProduct,
    }
    return <ProductContext.Provider value={values}>{children}</ ProductContext.Provider>
}