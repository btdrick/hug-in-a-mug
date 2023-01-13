import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

//Hook to create context for passing data
const Context = createContext();

export const StateContext = ({ children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        //Update quantity if product is already in cart, no duplicate products
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct, 
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${product.name} (${qty}) added to the cart.`)
    }

    //Callback to increase product quantity
    const incQty = () => {
        setQty((prev) => prev + 1);
    }

    //Callback to decrease product quantity
    const decQty = () => {
        setQty((prev) => {
            if(prev - 1 < 1) return 1;
            return prev - 1;
        });
    }   

    return (
        //Provides access to state values accross components
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);