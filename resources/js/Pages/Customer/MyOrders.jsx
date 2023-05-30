import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import OrderView from './Partials/OrderView';

export default function MyOrders({ auth }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(route('orders.index', {
            _query: {
                userid: auth.user.id
            }
        })).then(r => setOrders(r.data.data));
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">My orders</h2>}
        >
            <Head title="My orders" />

            <h1 className='text-2xl font-semibold mb-8'>Orders</h1>

            <div className="flex flex-wrap gap-2">
                {orders.reverse().map((order, index) => <OrderView key={index} order={order} />)}
            </div>
        </AuthenticatedLayout>
    );
}
