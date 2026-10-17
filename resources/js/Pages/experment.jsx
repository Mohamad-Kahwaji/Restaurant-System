import {useState} from 'react';

export default function practise(){
    const [meal,setmeal]=useState([
        {id:1,name:'slade',done:false},
        {id:2 ,name:'milk protine',done:false},
        {id:3,name:'pasta',done:false}
    ]);



    const toggle = (id) => {
        const newmeals = meal.map((meal)=>{
            if(meal.id === id){
                return {...meal,done:!meal.done};
            }
            return meal;
        });
        setmeal(newmeals);

    }
    return (
        <ul>
            {meal.map((meal)=>
            (
                <li key={meal.id}>
                    {meal.name} - {meal.done?'لسا ':'مكتمل' }
                    <button onClick={() => toggle(meal.id)}>فحص</button>
                </li>
            ))}
        </ul>
    );}
