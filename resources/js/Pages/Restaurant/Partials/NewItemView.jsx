import { useForm } from "@inertiajs/react";

export default function NewItemView({ auth, onFinish }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
    });

    const submit = async (e) => {
        e.preventDefault();

        await axios.post(route('foods.store', {
            ...data,
            restaurantid: auth.user.id
        }));
        onFinish();
    };

    return (
        <form className="text-gray-900 dark:text-gray-100 p-4 flex flex-col gap-2" onSubmit={submit}>
            <h1 className="text-2xl font-bold">New food</h1>
            <hr className="border-gray-500" />
            <div className='flex flex-col gap-2'>
                <label htmlFor="name">Name:</label>
                <input id='name' type="text" required value={data.name} onChange={e => setData('name', e.target.value)} className='bg-gray-900 text-gray-200 border border-gray-500 rounded-md focus:border-indigo-500 transition-colors' minLength={4} />
                <label htmlFor="description">Description:</label>
                <input id='description' type="text" required value={data.description} onChange={e => setData('description', e.target.value)} className='bg-gray-900 text-gray-200 border border-gray-500 rounded-md focus:border-indigo-500 transition-colors' minLength={4} />
                <label htmlFor="price">Price:</label>
                <input id='price' type="number" required value={data.price} onChange={e => setData('price', parseInt(e.target.value))} className='bg-gray-900 text-gray-200 border border-gray-500 rounded-md focus:border-indigo-500 transition-colors' min={1} />
                <button type="submit" className='mt-4 border border-indigo-500 text-indigo-500 py-0.5 px-3 hover:bg-indigo-500 hover:text-gray-200 rounded-sm transition-colors'>Save</button>
                <button onClick={onFinish} className='mt-1 border border-rose-600 text-rose-600 py-0.5 px-3 hover:bg-rose-600 hover:text-gray-200 rounded-sm transition-colors'>Cancel</button>
            </div>
        </form>
    );
}
