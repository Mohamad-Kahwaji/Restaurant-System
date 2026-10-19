import { useState } from 'react';
import SubscriptionLayout from '@/Layouts/Subscription';
import MealCard from '@/Components/MealCard';

export default function Subscription({ auth, subscription = null, days = [], meals = [] }) {
    const [selectedDate, setSelectedDate] = useState(days[0] ? days[0].date : '');
    const [selectedMealId, setSelectedMealId] = useState(null);

    const dailyMeals = meals.filter((meal) => meal.available_date === selectedDate);

    const selectDay = (date) => {
        setSelectedDate(date);
        setSelectedMealId(null);
    };

    const selectMeal = (mealId) => {
        setSelectedMealId(mealId);
    };

    const confirm = () => {
        if (!selectedMealId) return;
        // لاحقاً منبعت الطلب للسيرفر
    };

    if (!auth?.user) {
        return (
            <SubscriptionLayout title="الاشتراك">
                <p>لازم تسجّل دخول أول.</p>
            </SubscriptionLayout>
        );
    }

    if (!subscription) {
        return (
            <SubscriptionLayout title="الاشتراك" userName={auth.user.name}>
                <p>ما عندك اشتراك نشط حالياً.</p>
            </SubscriptionLayout>
        );
    }

    return (
        <SubscriptionLayout title="اختيار الوجبات" userName={auth.user.name}>
            <section>
                <span>
                    {subscription.status === 'active' ? 'اشتراك نشط' : subscription.status}
                </span>
            </section>

            <section>
                <p>{subscription.package.name}</p>
                <strong>{subscription.remaining_meals}</strong> وجبات متبقية من أصل{' '}
                {subscription.package.meals_count}
            </section>

            <section>
                <h2>جدول الوجبات</h2>
                {days.map((day) => (
                    <button key={day.date} type="button" onClick={() => selectDay(day.date)}>
                        {day.label}
                    </button>
                ))}
            </section>

            <section>
                <h2>اختر وجبة اليوم</h2>
                {dailyMeals.length === 0 ? (
                    <p>ما في وجبات متاحة بهاليوم.</p>
                ) : (
                    dailyMeals.map((meal) => (
                        <MealCard
                            key={meal.id}
                            meal={meal}
                            isSelected={selectedMealId === meal.id}
                            onSelect={selectMeal}
                        />
                    ))
                )}
            </section>

            <button
                type="button"
                disabled={!selectedMealId || subscription.remaining_meals < 1}
                onClick={confirm}
            >
                تأكيد الوجبة والموعد
            </button>
        </SubscriptionLayout>
    );
}
