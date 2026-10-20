// resources/js/Pages/Customer/Menu.jsx
import Customerlayout from '@/Layouts/Customerlayout';
import {useCart} from '@/Context/CartContext';

export default function Menu({meals = []}) {

    const {addItem} = useCart();
    return (
        <Customerlayout title="القائمة">
            {meals.map((meal)=>(
                <article key={meal.id}>
                    <h3>{meal.name}</h3>
                    <p>
                        {meal.description}
                    </p>
                    <strong>
                        {meal.price}$
                    </strong>
                    <button
                    type='button'
                    onClick={()=> addItem(meal)}>
                        +
                    </button>
                </article>
            ))}
        </Customerlayout>
    );
}
