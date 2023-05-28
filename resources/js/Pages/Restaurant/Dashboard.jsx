import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PaddedSection from '@/Components/PaddedSection';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import OrdersView from './Partials/OrdersView';

const Statuses = ['placed', 'cooking', 'waiting for courier', 'delivering', 'delivered'];

function Section({ children, className }) {
    return (
        <PaddedSection className={`flex flex-col gap-2 ${className}`}>
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

    useEffect(() => {
        const interval = setInterval(() => {
            setChange(p => !p);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <h1 className="text-2xl md:text-3xl font-semibold dark:text-gray-100 mb-4 md:mb-8">Welcome {auth.user.name}!</h1>

            <div className="flex flex-col gap-2 md:grid md:gap-4 md:grid-cols-2">
                <Section className='col-span-2'>
                    <OrdersView title={'Active orders'} orders={orders.filter(o => o.status === 'cooking')} onChange={() => setChange(p => !p)} buttonText='Done' statusUpdate='waiting for courier' />
                </Section>
                <Section>
                    <OrdersView title={'Waiting for confirmation'} orders={orders.filter(o => o.status === 'placed')} onChange={() => setChange(p => !p)} buttonText='Accept' statusUpdate='cooking' />
                </Section>
                <Section>
                    <OrdersView title={'Waiting for pickup'} orders={orders.filter(o => o.status === 'waiting for courier')} />
                </Section>
            </div>
        </AuthenticatedLayout>
    );
}
