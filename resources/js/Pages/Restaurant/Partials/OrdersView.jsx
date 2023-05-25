import axios from "axios";
import { useState } from "react";

function Order({ order, displayButton, onChange }) {
    const [submitting, setSubmitting] = useState(false);
    const formatter = new Intl.DateTimeFormat('hu', {
        dateStyle: undefined,
        timeStyle: 'medium'
    });

    async function readyOrder() {
        try {
            setSubmitting(true);
            await axios.put(route('orders.update', order), {
                ...order,
                status: 'ready'
            })
            onChange();
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="grid grid-cols-2 gap-x-0.5 p-2 place-items-center border-gray-300 border rounded-lg">
            <h2 className="col-span-2 text-center">Order #{order.id}</h2>
            <label>Date:</label>
            <p>{formatter.format(new Date(order.created_at))}</p>
            <label>Status:</label>
            <em>{order.status}</em>
            <div className="col-span-2 my-2 w-full h-[1px] border-y border-gray-300"></div>
                {order.foods.map((item, index) => (
                    <div key={index} className="col-span-2 w-full flex px-1 text-sm justify-between">
                        <label>{item.name}</label>
                        <p>{item.price}</p>
                    </div>
                ))}
            <div className="col-span-2 my-2 w-full h-[1px] border-y border-gray-300"></div>
            <label>Total:</label>
            <p>{order.foods.reduce((acc, curr) => acc + curr.price, 0)}</p>
            {displayButton && <button disabled={submitting} onClick={readyOrder} className="w-full disabled:cursor-not-allowed disabled:bg-indigo-800 disabled:text-gray-400 mt-2 col-span-2 bg-indigo-600 transition-colors hover:bg-indigo-500 p-1">Done</button>}
        </div>
    );
}

function Orders({ title, orders, displayButton, onChange }) {
    return (
        <div className="flex flex-col gap-2">
            <h1 className='text-xl underline underline-offset-4 font-medium'>{title}</h1>
            {orders.length
                ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                        {orders.map((order, index) => (
                            <li key={index}>
                                <Order order={order} displayButton={displayButton} onChange={onChange} />
                            </li>
                        ))}
                    </ul>)
                : (
                    <em className="dark:text-gray-400 text-gray-600 font-medium">No orders for now</em>
                )}
        </div>
    );
}

export default Orders;
