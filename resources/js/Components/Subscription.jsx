export default function Subcription({meal, isSelsected, onSelect}){
    return (
        <button
        type='button'
        onclick={() => onSelect(meal,id)}>
            <strong>
                {meal.name}
            </strong>
            <p>
                {meal.description}
            </p>
            <span>
                {isSelsected ? 'select this meal':'selected'}
            </span>
        </button>
    );
}
