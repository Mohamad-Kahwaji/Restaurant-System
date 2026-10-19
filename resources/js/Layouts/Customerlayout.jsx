import {Head ,Link} from '@inertiajs/react';

const links = [
    {name :'menu',route:'customer.menu'},
    {name :'basket',route:'customer.basket'},
    {name :'My orders',route:'customer.my_orders'},
];

export default function Customerlayout({title, cartCount = 0,children}){
    return (
        <div>
            <header>
                <p>
                    التوصيل الى جميع المناطق ضمن مدينة حمص
                </p>
                <h1>
                    ماذا تشتهي اليوم؟
                </h1>
                <Link href={route('customer.basket')}>icon {cartCount}</Link>

                <nav>
                    {links.map((item)=>(
                        <Link key={item.route}
                        href={route(item.route)}
                        aria-current={route().current(item.route)?'page': undefined}>
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </header>

            <main>{children}</main>


        </div>
    )
}
