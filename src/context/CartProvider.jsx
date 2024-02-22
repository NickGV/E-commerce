import { useReducer } from "react"
import { CartContext } from "./CartContext"

const initialState = []

export const CartProvider = ({children}) => {


  const comprasReducer = (state = initialState, action = {}) => {
        switch (action.type) {
            case '[CART] Add Purchase':
                return [...state, action.payload]
            case '[CART] Increase Purchase Quantity': 
                return state.map(item => {
                    const cant = item.amount + 1
                    if(item.id === action.payload) return {...item, amount: cant}
                    return item
                })
            case '[CART] Decrease Purchage Quantity': 
            return state.map(item => {
                const cant = item.amount -1
                if(item.id === action.payload && item.amount > 1) return {...item, amount: cant}
                return item
            })
            case '[CART] Remove Purchase':
                return state.filter(purchase => purchase.id !== action.payload)
            default:
                return state
        }
    }

    const [shoppingList, dispatch] = useReducer(comprasReducer, initialState)

    const addPurchase = (purchase) => {
        purchase.amount = 1
        const action = {
            type: '[CART] Add Purchase',
            payload: purchase
        }
        dispatch(action)

    }
    const increaseAmount = (id) => {
        const action = {
            type: '[CART] Increase Purchase Quantity',
            payload: id
        }
        dispatch(action)

    }
    const decreaseAmount = (id) => {
        const action = {
            type: '[CART] Decrease Purchage Quantity',
            payload: id
        }
        dispatch(action)

    }
    const removePurchase = (id) => {
        const action = {
            type: '[CART] Remove Purchase',
            payload: id
        }
        dispatch(action)

    }





    return (

        <CartContext.Provider value={{shoppingList, addPurchase, increaseAmount, decreaseAmount, removePurchase }}>
            {children}
        </CartContext.Provider>
    )
}
