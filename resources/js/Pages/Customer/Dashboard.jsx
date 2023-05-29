import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { createContext, useEffect, useState } from 'react';
import FoodView from './Partials/FoodView';
import Basket from './Partials/Basket';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';

export const BasketContext = createContext([null, null]);

function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
  }

export default function Dashboard({ auth }) {
    const [filters, setFilters] = useState({
        name: '',
        restaurant: '',
        category: '',
        min: '',
        max: ''
    });
    const [categories, setCategories] = useState([]);
    const [basket, setBasket] = useState([]);
    const [foods, setFoods] = useState([]);
    const debouncedFilters = useDebounce(filters, 500);

    useEffect(() => {
        axios.get(route('categories.index'))
            .then(r => setCategories(['', ...r.data.data.map(c => c.name)]))
    }, []);

    useEffect(() => {
        axios.get(route('foods.index', debouncedFilters))
            .then(r => setFoods(r.data.data));
    }, [debouncedFilters]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <h1 className='text-2xl font-semibold mb-8'>Welcome to poodFanda {auth.user.name}!</h1>

            <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap gap-1 mb-4">
                <div>
                    <InputLabel htmlFor='name' value='Name' />
                    <TextInput id='name' type='text' name='name' value={filters.name} onChange={e => setFilters(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                    <InputLabel htmlFor='restaurant' value='Restaurant' />
                    <TextInput id='restaurant' type='text' name='restaurant' value={filters.restaurant} onChange={e => setFilters(p => ({ ...p, restaurant: e.target.value }))} />
                </div>
                <div>
                    <InputLabel htmlFor='category' value='Category' />
                    <SelectInput id='category' options={categories} value={filters.category} onChange={e => setFilters(p => ({ ...p, category: e.target.value }))} />
                </div>
                <div>
                    <InputLabel htmlFor='min' value='Price from' />
                    <TextInput id='min' type='number' value={filters.min} onChange={e => setFilters(p => ({ ...p, min: Number(e.target.value) }))} />
                </div>
                <div>
                    <InputLabel htmlFor='max' value='Price to' />
                    <TextInput id='max' type='number' value={filters.max} onChange={e => setFilters(p => ({ ...p, max: Number(e.target.value) }))} />
                </div>
            </div>

            <BasketContext.Provider value={[basket, setBasket]}>
                <div className="flex flex-wrap gap-2">
                    {foods.length === 0 && <em className='text-gray-400'>No foods</em>}
                    {foods.map((food, index) => <FoodView key={index} auth={auth} food={food} />)}
                </div>

                <Basket auth={auth} />
            </BasketContext.Provider>
        </AuthenticatedLayout>
    );
}
