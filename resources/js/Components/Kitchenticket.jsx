const stateInfo = {
    new:{
        label:'جديد',
        pill:'bg-[#EAF0F5] text-[#43556B]'
        },

    preparing:{
        label:'قيد التحضير',
        pill:'bg-[#FFF2DC] text-[#9A5107]'
        },

    ready: {
        label:' جاهز',
        pill:'bg-[#E5F6EB] text-[#137436]'
        },

    };
    const actionlabel ={
        new: 'بدء التحضير ',
        preparing: 'تحديد الطلب جاهزا',
        ready:'جاهز للاستلام',
    };

export default function Kitchenticket({ticket}){
    const info = stateInfo[ticket.state];

    return (
        <artical className = 'rounded-2x1 border border-[#40516A] bg-[#202D40] p-4'>
            <div className = 'flex items-center justify-between gap-2'>
                <strong>#{ticket.id}</strong>
                <spam className = {`rounded-full px-2.5 py-1 text-xs font-extrabold ${info.pill}`}>
                    {info.id}
                </spam>
            </div>
            <p className = 'mt-2 text-sm text-slate-300'>
                {ticket.context}.منذ {ticket.elapsed}
            </p>
            {ticket.items.map((item)=>(
                <div key ={item.name}
                className= "flex items-center justify-between gap-2.5 border-b border-[#202D40] py-2 last:border-0">
                    <span >
                        {item.name}
                    </span>
                    <button type="button"
                    className={`rounded-lg border px-3 py-[7px] text-sm text-white
                        ${item.done ? 'border-[#16A34A] bg-[#16A34A]'
                                    : 'border-[#5D7088] bg-[#31445B]'
                        }`}
                        >
                            {item.done? 'فحص':"مكتمل"}
                        </button>
                </div>
            ))}
            <button
                type="button"
                className={`mt-4 min-h-11 w-full rounded-xl font-extrabold text-white ${
                    ticket.state === 'ready' ? 'bg-[#16A34A]' : 'bg-[#F97316]'
                }`}
            >
                {actionlabel[ticket.state]}
            </button>
        </artical>
    )
}



