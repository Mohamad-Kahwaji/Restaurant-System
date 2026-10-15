import Kitchenlayout from '@/Layouts/Kitchenlayout';
import Kitchenticket from '@/Components/Kitchenticket';

const tickets = [
    {
        id: 'SUB-214',
        group: 'sub',
        context: 'ريم · استلام ٧:١٥ م',
        elapsed: '٠٦ دقائق',
        state: 'new',
        items: [{ name: 'دجاج مشوي مع الأرز', done: false }],
    },
    {
        id: 'DIN-081',
        group: 'dine',
        context: 'طاولة ٤ · #S104',
        elapsed: '١٢ دقيقة',
        state: 'preparing',
        items: [
            { name: 'برغر المطعم × ٢', done: false },
            { name: 'سلطة الحديقة × ١', done: true },
        ],
    },
    {
        id: 'DIN-076',
        group: 'dine',
        context: 'طاولة ٦ · #S106',
        elapsed: '١٩ دقيقة',
        state: 'ready',
        items: [{ name: 'باستا الفطر × ٢', done: true }],
    },
];

export default function Kitchen() {
    const subTickets = tickets.filter((t) => t.group === 'sub');
    const dineTickets = tickets.filter((t) => t.group === 'dine');

    return (
        <Kitchenlayout title="الطلبات" ticketsCount={tickets.length}>
            <div className="grid gap-5 p-6 lg:grid-cols-2">
                <section>
                    <h2 className="text-xl font-extrabold">
                        اشتراكات اليوم <span className="text-orange-400">/ 01</span>
                    </h2>
                    <div className="mt-3 space-y-3">
                        {subTickets.map((t) => (
                            <Kitchenticket key={t.id} ticket={t} />
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-extrabold">
                        طلبات الصالة <span className="text-orange-400">/ 02</span>
                    </h2>
                    <div className="mt-3 space-y-3">
                        {dineTickets.map((t) => (
                            <Kitchenticket key={t.id} ticket={t} />
                        ))}
                    </div>
                </section>
            </div>
        </Kitchenlayout>
    );
}
