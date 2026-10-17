import CustomerLayout from '@/Layouts/CustomerLayout';

const user = { name: 'ريم' };

const subscription = {
    status: 'active',
    remaining_meals: 3,
    package: { name: 'باقة الأسبوع', meals_count: 5 },
};

const days = [
    { date: '2026-10-12', label: 'الاثنين ١٢' },
    { date: '2026-10-13', label: 'الثلاثاء ١٣' },
    { date: '2026-10-14', label: 'الأربعاء ١٤' },
    { date: '2026-10-15', label: 'الخميس ١٥' },
    { date: '2026-10-16', label: 'الجمعة ١٦' },
];

const meals = [
    {
        id: 1,
        name: 'دجاج مشوي مع الأرز',
        description: 'خضار موسمية · وجبة متوازنة',
        available_date: '2026-10-12',
    },
    {
        id: 2,
        name: 'سلمون مع الخضار',
        description: 'طبق طازج غني بالنكهة',
        available_date: '2026-10-12',
    },
];

export default function Subscription() {
    return (
        <CustomerLayout title="الاشتراك">
            <section id="home">
                <h1>أهلاً {user.name}</h1>
                <span>
                    {subscription.status === 'active' ? 'اشتراك نشط' : subscription.status}
                </span>
            </section>

            <section id="balance">
                <p>{subscription.package.name}</p>
                <strong>{subscription.remaining_meals}</strong> وجبات متبقية من أصل{' '}
                {subscription.package.meals_count}
            </section>

            <p>⏱ تنبيه: ينتهي اختيار وجبة اليوم عند ٨:٠٠ مساءً. أكّد موعدك قبل الإغلاق.</p>

            <section id="days">
                <h2>جدول الوجبات</h2>
                {days.map((day) => (
                    <button key={day.date} type="button">
                        {day.label}
                    </button>
                ))}
            </section>

            <section>
                <h2>اختر وجبة اليوم</h2>
                {meals.map((meal) => (
                    <div key={meal.id}>
                        <strong>{meal.name}</strong>
                        <p>{meal.description}</p>
                    </div>
                ))}
            </section>

            <button type="button" disabled>
                تأكيد الوجبة والموعد
            </button>
        </CustomerLayout>
    );
}
