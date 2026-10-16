import React,{useState} from 'react';
import {Head} from '@inertiajs/react';

export default function Subscription ({auth, subscription, day = [],meals = []}){
        const [selectedDate, setselectedDate] = useState(day[0]?.date || '');

        const [selectedMealsid,setselectedMealsid] = useState(null);

        const dailyMeals = meals.filter((meal)=>meal.available_date === selectedDate);

        const handleconfirmSelection = () =>{
            if(!selectedMailsid) return ;

            route.post('/meal-selections',{
                subscription_id: subscription.id,
                meal_id: selectedMealsid,
                date: selectedDate
            });
        };
        return (
            <div className = 'min-h-screen bg-gray-100 flex justiy-center py-10 font-sans' dir='rtl'>
                <Head title='table subscriptions'/>
                <div className = 'w-full max-w-md bg-white rounded-3xl shadow-xl p-6'>
                    <div className = 'flex justify-between items-center mb-6'>
                        <p className="text-gray-400 text-xs">
                            {selectedDate}
                        </p>
                        <h1 className="text-xl font-bold text-slate-900 mt-1">
                            wellcome {auth.user.name}
                        </h1>
                    </div>
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        {subscription.status === 'active'? 'subscription is active': subscription.status}
                    </span>
                </div>



                <div>
                    <p>
                        {subscription.package.name}
                    </p>
                    <div >
                        <span>
                            {subscription.package.meals_count}
                        </span>
                        <div>
                            <span>
                                remaining meals
                            </span>
                            <storng>
                                {subscription.remaining_meals}
                            </storng>
                        </div>
                    </div>
                </div>



                <div>
                    ⏱ تنبيه: ينتهي اختيار وجبة اليوم عند 8:00 مساءً. أكّد موعدك قبل الإغلاق
                </div>


                <div>
                    <h2>
                        table meals
                    </h2>
                    <div>
                        {days.map((day)=>(
                            <button key = {day.date}
                            type = 'button'
                            onclick = {() => {setselectedDate(day.date);
                                            setselectedMealsid(null);
                                    }
                        }>

                        {meal.image && (
                            <img
                            src ={`/storage/${meal.image}`}
                            alt = {meal.name}
                            />
                        )}
                        <div>
                            <h3>
                                {meal.name}
                            </h3>
                            <p>
                                {meal.description}
                            </p>
                            <span>
                                {selectedMealsid === meals.id ? 'check meal ':'is cheacked'}
                            </span>
                        </div>
                        </button>
                        ))}
                    </div>
                </div>


                <button
                    type ='button'
                    onclick = {hwandleconfirmSelection}
                    disabled= {!selectedMealsid || subscription.remaiining_meals < 1}
                    >
                        confirm selection
                    </button>
            </div>
        );
}
