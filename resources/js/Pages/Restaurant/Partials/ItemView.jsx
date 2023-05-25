import Modal from '@/Components/Modal';
import PaddedSection from '@/Components/PaddedSection';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Item({ item, onDidChange }) {
    const [editing, setEditing] = useState(false);

    async function deleteItem(item) {
        if (!confirm(`Are you sure you want to delete ${item.name}?`))
            return;

        await axios.delete(route('foods.destroy', {
            food: item
        }), item);
        onDidChange();
    }

    return (
        <>
            <Modal show={editing} onClose={() => setEditing(false)}>
                <EditItem item={item} onCancel={() => setEditing(false)} onDidChange={onDidChange} />
            </Modal>
            <PaddedSection className='flex flex-col gap-2 p-1'>
                <h1 className='text-lg font-semibold'>{item.name}</h1>
                <div className='flex flex-col gap-1'>
                    <label>Description:</label>
                    <p className='bg-gray-900 px-2 py-1 border border-gray-500 rounded-md max-w-prose'>{item.description}</p>
                    <div className="flex justify-between">
                        <label>Price:</label>
                        <p className='text-right font-mono italic'>{item.price} Ft</p>
                    </div>
                    <button onClick={() => setEditing(true)} className='border border-indigo-500 text-indigo-500 py-0.5 px-3 hover:bg-indigo-500 hover:text-gray-200 rounded-sm transition-colors'>Edit</button>
                    <button onClick={() => deleteItem(item)} className='border border-rose-600 text-rose-600 py-0.5 px-3 hover:bg-rose-600 hover:text-gray-200 rounded-sm transition-colors'>Delete</button>
                </div>
            </PaddedSection>
        </>
    );
}
function EditItem({ item, onCancel, onDidChange }) {
    const { data, setData, processing, errors, reset } = useForm({
        name: '',
        description: '',
        image_url: '',
        price: '',
    });

    useEffect(() => {
        setData(item);
        return () => reset('name', 'description', 'price');
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        await axios.put(route('foods.update', data), data);
        onDidChange();
        onCancel();
    };

    // async function submit() {
    //     await modifyItem({ ...item, name, description, price });
    // }

    return (
        <form className='text-gray-900 dark:text-gray-100 p-4 flex flex-col gap-2' onSubmit={submit}>
            <h1 className="text-2xl font-bold">Editing {item.name}</h1>
            <hr className="border-gray-500" />
            <label htmlFor='name'>Name:</label>
            <input id='name' type="text" required value={data.name} onChange={e => setData('name', e.target.value)} className='bg-gray-900 text-gray-200 border border-gray-500 rounded-md focus:border-indigo-500 transition-colors' minLength={4} />
            <label htmlFor='description'>Description:</label>
            <input id='description' type="text" required value={data.description} onChange={e => setData('description', e.target.value)} className='bg-gray-900 text-gray-200 border border-gray-500 rounded-md focus:border-indigo-500 transition-colors' minLength={4} />
            <label htmlFor='image_url'>Image URL:</label>
            <input id='image_url' type="text" value={data.image_url} onChange={e => setData('image_url', e.target.value)} className='bg-gray-900 text-gray-200 border border-gray-500 rounded-md focus:border-indigo-500 transition-colors' minLength={4} />
            <label htmlFor='price'>Price:</label>
            <input id='price' type="number" required value={data.price} onChange={e => setData('price', parseInt(e.target.value))} className='bg-gray-900 text-gray-200 border border-gray-500 rounded-md focus:border-indigo-500 transition-colors' min={1} />
            <button type='submit' className='border border-indigo-500 text-indigo-500 py-0.5 px-3 hover:bg-indigo-500 hover:text-gray-200 rounded-sm transition-colors'>Save</button>
            <button onClick={onCancel} className='border border-rose-600 text-rose-600 py-0.5 px-3 hover:bg-rose-600 hover:text-gray-200 rounded-sm transition-colors'>Cancel</button>
        </form>
    );
}
