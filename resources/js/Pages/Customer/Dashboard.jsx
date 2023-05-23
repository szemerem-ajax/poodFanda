import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { createContext, useEffect, useState } from 'react';
import FoodView from './Partials/FoodView';
import Basket from './Partials/Basket';

export const BasketContext = createContext([null, null]);

export default function Dashboard({ auth }) {
    const [basket, setBasket] = useState([]);
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios.get(route('foods.index'))
            .then(r => setFoods(r.data.data));
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <h1 className='text-2xl font-semibold mb-8'>Welcome to poodFanda {auth.user.name}!</h1>

            <BasketContext.Provider value={[basket, setBasket]}>
                <div className="flex flex-nowrap overflow-x-scroll md:overflow-hidden md:flex-wrap gap-2">
                    {foods.map((food, index) => <FoodView key={index} auth={auth} food={food} />)}
                </div>

                <Basket auth={auth} />
            </BasketContext.Provider>
        </AuthenticatedLayout>
    );
}
