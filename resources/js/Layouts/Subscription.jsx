import {Head} from '@inertiajs/react';

export default function Subscription ({tilte,children})
{
    return (
        <div dir='rtl'>
            <Head title={title}/>

            <main>{children}</main>

            <nav>
                <a href='#home'>home</a>
                <a href='#days'>table</a>
                <a href='#blance'>blance</a>
            </nav>

        </div>
    );
}
