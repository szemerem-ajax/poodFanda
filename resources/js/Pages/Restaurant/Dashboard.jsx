import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PaddedSection from '@/Components/PaddedSection';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import OrdersView from './Partials/OrdersView';

function Section({ children }) {
    return (
        <PaddedSection className='flex flex-col gap-2'>
            {children}
        </PaddedSection>
    );
}

export default function Dashboard({ auth }) {
    const user = auth.user;
    const [change, setChange] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get(route('orders.index'), {
            params: {
                restaurantid: user.id
            }
        }).then(r => setOrders(r.data.data));
    }, [change]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <h1 className="text-2xl md:text-3xl font-semibold dark:text-gray-100 mb-4 md:mb-8">Welcome {auth.user.name}!</h1>

            <div className="flex flex-col gap-2 md:grid md:gap-4 md:grid-cols-2">
                <Section>
                    <OrdersView title={'Active orders'} orders={orders.filter(o => o.status === 'cooking')} onChange={() => setChange(p => !p)} displayButton />
                </Section>
                <Section>
                    <OrdersView title={'Waiting for pickup'} orders={orders.filter(o => o.status === 'ready')} />
                </Section>
            </div>
        </AuthenticatedLayout>
    );
}
