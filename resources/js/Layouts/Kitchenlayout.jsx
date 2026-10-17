import { Head } from '@inertiajs/react';

export default function KitchenLayout({ title, ticketsCount = 0, children }) {
    return (
        <div dir="rtl">
            <Head title={`المطبخ | ${title}`} />

            <header>
                <p>KITCHEN DISPLAY SYSTEM</p>
                <h1>لوحة تجهيز الطلبات</h1>
                <span>تذاكر اليوم · {ticketsCount}</span>
            </header>

            <main>{children}</main>
        </div>
    );
}
