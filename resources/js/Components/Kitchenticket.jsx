const stateLabel = {
    new: 'جديد',
    preparing: 'قيد التحضير',
    ready: 'جاهز',
};

const actionLabel = {
    new: 'بدء التحضير',
    preparing: 'تحديد الطلب جاهزاً',
    ready: 'جاهز للاستلام',
};

export default function KitchenTicket({ ticket, onToggleItem, onAdvance }) {
    const allDone = ticket.items.every((item) => item.done);
    const canAdvance =
        ticket.state === 'new' || (ticket.state === 'preparing' && allDone);

    return (
        <article>
            <div>
                <strong>#{ticket.id}</strong>
                <span> {stateLabel[ticket.state]}</span>
            </div>

            <p>
                {ticket.context} · منذ {ticket.elapsed}
            </p>

            {ticket.items.map((item) => (
                <div key={item.id}>
                    <span>{item.name}</span>
                    <button
                        type="button"
                        disabled={ticket.state === 'ready'}
                        onClick={() => onToggleItem(ticket.id, item.id)}
                    >
                        {item.done ? '✓ مكتمل' : 'فحص'}
                    </button>
                </div>
            ))}

            <button
                type="button"
                disabled={!canAdvance}
                onClick={() => onAdvance(ticket.id)}
            >
                {actionLabel[ticket.state]}
            </button>
        </article>
    );
}
