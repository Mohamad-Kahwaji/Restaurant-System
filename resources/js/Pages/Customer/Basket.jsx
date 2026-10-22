import Customerlayout from '@/Layouts/Customerlayout';
import {useCart} from '@/Context/CartContext';
import {useState} from 'react';
import {route} from '@inertiajs/react';


export default function Basket({deliveryFee = 0,addresses = []}){
    const {items,increase,decrease,clearCart} = useCart();

    const [addressId,setAddressId] = useState('');
    const [paymentMethod,setPaymentMethod] = useState('cash');

    const subtotal = items.reduce(
        (sum,item) => sum + item.price * item.quantity,
        0,
    );

    const total  = subtotal + (items.length > 0 ? deliveryFee : 0  );

    const confirm = () =>{
        if(!addressId) return;
            route.post('/orders',{
                address_id:addressId,
                payment_method:paymentMethod,
                items: items.map((item)=>({
                    meal_id:item.id,
                    quantity:item.quantity,
            })),
        },
    {onSuccess:()=> clearCart(),},);
    };

    return (
        <Customerlayout title = 'السلة'>
            <section>
                <h2>سلتك</h2>
                <span>{items.length} وجبات</span>

                {items.map((item)=>(
                    <div key={item.id}>
                        <div>
                            <strong>{item.name}</strong>
                            <p>{item.quantity} * $ {item.price}</p>
                        </div>

                        <div>
                            <button
                            type='button'
                            onClick={()=> increase(item.id)}>
                                +
                            </button>
                            <span >
                                {item.quantity}
                            </span>
                            <button
                            type='button'
                            onClick={()=> decrease(item.id)}>
                                -
                            </button>
                        </div>
                    </div>
                    ))}
            </section>

            <section>
                <p>المجموع الفرعي: € {subtotal}</p>
                <p>رسوم التوصيل: € {deliveryFee}</p>
                <p>الإجمالي: € {total}</p>
            </section>

            <section>
                <h2>
                    عنوان التوصيل
                </h2>
                {addresses.length === 0?(
                    <p>ما عندك عناوين محفوظة</p>
                    )
                    :(
                        <select value={addressId}
                                onChange={(e)=> setAddressId(e.target.value)}
                                >
                                    <option value = ''>
                                        اختر عنوان
                                    </option>
                                    {addresses.map((address)=>(
                                        <option key={address.id} value = {affress.id}>
                                            {address.area}
                                            -
                                            {address.street}
                                        </option>
                                    ))}
                        </select>
                    )}
            </section>

            <section>
                <h2>
                    طريقة الدفع
                </h2>
                <label>
                    <input type='radio'
                    name='payment'
                    vlaue='online'
                    checked={paymentMethod === 'online'}
                    onchange={()=> setPaymentMethod('online')}/>
                    اونلاين
                </label>

            </section>


            <button
            type='button'
            disavled={item.length === 0}>
                تأكيد طلب التوصيل
            </button>
        </Customerlayout>
    );
}
