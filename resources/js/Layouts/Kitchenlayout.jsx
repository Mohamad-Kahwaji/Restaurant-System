import React from 'react';
import {Head} from '@inertiajs/react';
import KitchenLayout from '@/Layouts/KitchenLayout';

export default function Kitchenlayout({title , children, ticketscount = 0 }){
    return (
        <div dir="rtl" className="min-h-screen bg-[#101827]  text-white">
            <Head title={`المطبخ | ${title}`} />

            <header className='flex flex-warp item-center justify-between gap-4 border-b border-[#344056] px-6 py-5 '>
                <div>
                    <p dir='ltr' className='text-xs font-bold text-orange-300'>
                        Kitchen Display system
                    </p>
                    <h1 className='text-2x1 font-extrabold py-3'>لوحة تحكم المطبخ</h1>
                </div>

                <span className='inline-flex items-center rounded-full bg-[#FFF2DC] px-2.5 py-1 text-xs font-extrabold text-[#9A5107]'>
                    تذاكر اليوم .{ticketscount}
                </span>
            </header>
            <main>{children}</main>
        </div>
    );
}
