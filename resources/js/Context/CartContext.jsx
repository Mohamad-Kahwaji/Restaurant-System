import {creatContext, useContext,useEffect, useState} from 'react';

const CartContext = creatContext(null);


export function CartProvider({children}){
    cont [items, setItems] = useState(()=> {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];

        }
        catch{
            return [];
        }
    });

    useEffect(()=> {
        localStorage.setItem('cart',JSON.stringify(item));
    },[items]);

    const addItem = (meal)=>{
        setItems((prev) => {
            const existing = prev.find((item)=> item.id === meal.id);

            if(existing){
                return prev.map((item)=>
                item.id === meal.id ? {...item,quantity : item.quantity + 1}
            :item
            );
        }

        return [
            ...prev, {id:meal.id,name:meal.name ,price:Number(meal.price),quantity:1},
        ];
        });
    };

    const cartCount = items.reduce((sum,utem )=> sum + item.quantity,0);
    return (
        <CartContext.Provider value = {{ items,addItem, cartCount }}>
            {children}
        </CartContext.Provider>
    );

}
export function useCart(){
    const context = useContext(CartContext);
    if(!context){
        throw new Error('useCart must be used inside CartProvider');
    }
    return context;
}
