import {createContext, useContext,useEffect, useState} from 'react';

const CartContext = createContext(null);
const clearCrat = ()=>setItem([]);

export function CartProvider({children}){
    const [items, setItems] = useState(()=> {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];

        }
        catch{
            return [];
        }
    });

    useEffect(()=> {
        localStorage.setItem('cart',JSON.stringify(items));
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


    const increase = (id) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            ),
        );
    };

    const decrease = (id) => {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item,
                )
                .filter((item) => item.quantity > 0),
        );
    };

    const cartCount = items.reduce((sum,item )=> sum + item.quantity,0);
    return (
        <CartContext.Provider value = {{ items,addItem, cartCount ,increase,decrease ,clearCrat}}>
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
