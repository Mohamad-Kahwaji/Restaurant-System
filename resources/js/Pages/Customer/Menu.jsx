// resources/js/Pages/Customer/Menu.jsx
import Customerlayout from '@/Layouts/Customerlayout';

export default function Menu({meals = []}) {
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
                    type='button'>
                        +
                    </button>
                </article>
            ))}
        </Customerlayout>
    );
}
