import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '@/Components/Modal';
import Item from './Partials/ItemView';
import NewItemView from './Partials/NewItemView';
import { Head } from '@inertiajs/react';

export default function Items({ auth }) {
    const user = auth.user;
    const [foods, setFoods] = useState([]);
    const [change, setChange] = useState(false);
    const [adding, setAdding] = useState(false);
    console.log(auth.user.id)

    useEffect(() => {
        setChange(p => !p);
    }, [adding]);

    useEffect(() => {
        axios.get(route('foods.index'))
            .then(r => setFoods(
                r.data.data
                    .filter(f => f.restaurantid === user.id)
                )
            );
    }, [change]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Items</h2>}
        >
            <Head title='Items' />

            <div className='flex flex-col gap-4 items-center'>
                <Modal show={adding} onClose={() => setAdding(false)}>
                    <NewItemView auth={auth} onFinish={() => setAdding(false)} />
                </Modal>
                <div className="w-full flex flex-wrap items-center gap-2">
                    {foods.length === 0 && <em className='text-xl'>No foods</em>}
                    {foods.map((food, index) => <Item key={index} item={food} onDidChange={() => setChange(p => !p)} />)}
                </div>
                <button onClick={() => setAdding(true)} className='bg-indigo-500 text-gray-200 py-0.5 px-3 hover:bg-indigo-700 rounded-sm transition-colors'>Create new food</button>
            </div>
        </AuthenticatedLayout>
    );
}
