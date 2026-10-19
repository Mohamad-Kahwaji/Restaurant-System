export default function MealCard({meal,isSelected,onSelect}){
    return (
        <button
        type='button'
        onClick={()=>onSelect(meal.id)}>
            <strong>
                {meal.name}
            </strong>
            <p>
                {meal.description}
            </p>
            <span>
                {isSelected ? 'select this meal': 'selected'}
            </span>
        </button>
    );
}
