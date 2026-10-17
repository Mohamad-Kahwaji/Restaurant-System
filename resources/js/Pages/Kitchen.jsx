import { useState } from 'react';
import KitchenLayout from '@/Layouts/Kitchenlayout';
import KitchenTicket from '@/Components/KitchenTicket';

const initialTickets = [
    {
        id: 'SUB-214',
        group: 'sub',
        context: 'ريم · استلام ٧:١٥ م',
        elapsed: '٠٦ دقائق',
        state: 'new',
        items: [{ id: 'i1', name: 'دجاج مشوي مع الأرز', done: false }],
    },
    {
        id: 'DIN-081',
        group: 'dine',
        context: 'طاولة ٤ · #S104',
        elapsed: '١٢ دقيقة',
        state: 'preparing',
        items: [
            { id: 'i2', name: 'برغر المطعم × ٢', done: false },
            { id: 'i3', name: 'سلطة الحديقة × ١', done: true },
        ],
    },
    {
        id: 'DIN-076',
        group: 'dine',
        context: 'طاولة ٦ · #S106',
        elapsed: '١٩ دقيقة',
        state: 'ready',
        items: [{ id: 'i4', name: 'باستا الفطر × ٢', done: true }],
    },
];

export default function Kitchen() {
    const [tickets, setTickets] = useState(initialTickets);

    const toggleItem = (ticketId, itemId) => {
        setTickets((prev) =>
            prev.map((ticket) => {
                if (ticket.id !== ticketId) return ticket;

                return {
                    ...ticket,
                    state: ticket.state === 'new' ? 'preparing' : ticket.state,
                    items: ticket.items.map((item) =>
                        item.id === itemId ? { ...item, done: !item.done } : item,
                    ),
                };
            }),
        );
    };

    const advance = (ticketId) => {
        setTickets((prev) =>
            prev.map((ticket) => {
                if (ticket.id !== ticketId) return ticket;
                if (ticket.state === 'new') return { ...ticket, state: 'preparing' };
                if (ticket.state === 'preparing') return { ...ticket, state: 'ready' };
                return ticket;
            }),
        );
    };

    const subTickets = tickets.filter((t) => t.group === 'sub');
    const dineTickets = tickets.filter((t) => t.group === 'dine');

    return (
        <KitchenLayout title="الطلبات" ticketsCount={tickets.length}>
            <section>
                <h2>اشتراكات اليوم / 01</h2>
                {subTickets.map((t) => (
                    <KitchenTicket
                        key={t.id}
                        ticket={t}
                        onToggleItem={toggleItem}
                        onAdvance={advance}
                    />
                ))}
            </section>

            <section>
                <h2>طلبات الصالة / 02</h2>
                {dineTickets.map((t) => (
                    <KitchenTicket
                        key={t.id}
                        ticket={t}
                        onToggleItem={toggleItem}
                        onAdvance={advance}
                    />
                ))}
            </section>
        </KitchenLayout>
    );
}
