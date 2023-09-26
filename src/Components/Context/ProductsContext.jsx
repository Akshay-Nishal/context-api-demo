import { createContext, useReducer } from "react";

export const ProductContext = createContext(
    {
        productList : [],
        onAddProduct:(item)=>{},
        onPurchaseProduct:(item)=>{}
    }
)

const defaultProducts ={
    products:[
        {name:'Adidas',description:'Running shoes',price:250,large:15,medium:25,small:0},
        {name:'Bata',description:'Slippers',price:50,large:10,medium:5,small:7},
        {name:'Jordan',description:'Basketball shoes',price:500,large:2,medium:7,small:3},
    ]
}

const productReducer = (state,action) =>{
    if(action.type==='Add'){
        console.log(action.item)
        const newList = state.products.concat(action.item)
        return{
            products:newList
        }
    }
    if(action.type==='Purchase'){
        console.log("Purchased : ",action.item)
        let ind = state.products.findIndex((it)=>it.name===action.item.name)
        console.log(ind);
        let newList = state.products
        let updatedProduct = newList[ind]
        if(action.item.size==='large'){
            updatedProduct.large=updatedProduct.large-1
        }
        if(action.item.size==='medium'){
            updatedProduct.medium=updatedProduct.medium-1
        }
        if(action.item.size==='small'){
            updatedProduct.small=updatedProduct.small-1
        }
        newList[ind]=updatedProduct
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

    const values={
        productList : listState.products,
        onAddProduct : addProduct,
        onPurchaseProduct : purchaseProduct
    }
    return <ProductContext.Provider value={values}>{children}</ ProductContext.Provider>
}