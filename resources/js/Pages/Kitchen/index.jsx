import React from 'react';
import {Head} from '@inertiajs/react';

export default function Kitchenindex(){
    const orders = [
        { id: 101, table: 'طاولة 4', meal: 'برغر كلاسيك', status: 'قيد التحضير' },
        { id: 102, table: 'اشتراك ريم', meal: 'دجاج مشوي مع الأرز', status: 'طلب جديد' }
    ];

    return (
        <div className='min-h-screen bg-slate-900 text-white p-6 front-sans dir="rtl"'>
            <Head title= 'شاشة المطبخ'/>

        <h1 className='text-2x1 font-bold mb-6 text-orange-400 border-b border-slate-700 pb-3' >
            لوحة طلبات المطبخ
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
            {orders.map((order)=>(    /* لعرض كل طلب حلقة تكرارية مشان بنعرضو بالكارد*/
                <div key = {order.id} className = 'bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-md'>
                    <div className = 'flex justify-between items-center mb-2'>
                        <span className = 'foont-bold text-lg'>
                            order #{order.id}
                        </span>
                        <span className = 'text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded'>
                            {order.status}
                        </span>
                    </div>

                    <p className = 'text-slate-400 text-sm mb-1'>
                        {order.table}
                    </p>
                    <p classNmae= 'text-white font-medium mb-4'>
                        {order.meal}
                    </p>
                    <button onClick={()=>alerrt (`is ready #${order.id}`)}
                        className= 'w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-lg text-sm transition'>
                            check is ready
                    </button>
                </div>
            ))}
            </div>
        </div>
    );
}
