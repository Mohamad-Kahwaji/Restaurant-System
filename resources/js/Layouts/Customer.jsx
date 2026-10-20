import {useCart } from '@/Context/CartContext';


export default function Customerlayout({title,children}){
    const {cartCount} = useCart();
    
}
