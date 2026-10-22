import Customerlayout from '@/Layouts/Customerlayout';
    const statusLabel = {
        pendding:'قيد الانتظار',
        in_kitchen:'بالتحضير',
        out_for_delivery:'قيد التوصيل',
        delivery:'تم التسليم',
        cancelled:'ملغي',
    };


    export default function MyOrders({orders=[]}){
        return (
            <Customerlayout title='طلباتي'>
                <section>
                    <h2> طلباتي</h2>
                    {orders.length === 0?(
                        <p>ما عندك طلبات بعد</p>
                    ):
                    (
                        orders.map((order)=>(
                            <div key={order.id}>
                                <div>
                                <strong>
                                    {order.id}#طلب
                                </strong>
                                <span>
                                    {statusLabel[order.status]}
                                </span>
                            </div>

                            { orders.items.map((item)=>(
                                <p key={item.id}>
                                    {item.meal.name} * {item.quantity}
                                </p>
                            )) }
                            <p>
                                الاجمالي: ${order.total_amount}
                            </p>
                            </div>
                        ))

                    )}
                </section>
            </Customerlayout>
        )
    }
