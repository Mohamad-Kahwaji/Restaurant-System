import {Head} from '@inertiajs/react';

export default function Subscription ({title,userName,children})
{
    return (
        <div dir='rtl'>
            <Head title={`subscription|${title}`}/>

            <main>{children}</main>

            <header>
                <p>subscription</p>
                <h1 >Dashboard</h1>
                <span >wellcome {userName}</span>
            </header>

        </div>
    );
}
