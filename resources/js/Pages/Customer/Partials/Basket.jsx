import { useContext } from "react";
import { BasketContext } from "../Dashboard";

export default function Basket({ auth }) {
    const [basket, setBasket] = useContext(BasketContext);
    const visible = basket.length > 0;

    async function order() {
        const foods = basket.map(f => ({ id: f.id }));

        await axios.post(route('orders.store'), {
            userid: auth.user.id,
            foods
        });
        clearBasket();
    }

    function clearBasket() {
        setBasket([]);
    }

    function removeItem(index) {
        setBasket(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    }

    return (
        <div className={`fixed ${visible ? 'bottom-0' : '-bottom-full'} right-4 md:right-12 transition-all duration-500 ease-in-out`}>
            <div className="bg-indigo-950 border border-gray-400 border-b-0 p-2 px-4 rounded-t-md min-w-[200px] md:min-w-[300px]">
                <h1 className="text-center text-xl font-medium text-gray-200">Basket</h1>
                <div className="flex flex-col items-center p-2">
                    {basket.map((food, index) =>
                        <div key={index} className="flex items-baseline w-full justify-between">
                            <div className="flex gap-1">
                                <button className="text-rose-600 transition-colors hover:text-rose-500" onClick={() => removeItem(index)}>&#x2717;</button>
                                <span>{food.name}</span>
                            </div>
                            <span className="text-right font-mono text-sm">{food.price}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-baseline w-full justify-between">
                    <span className="text-lg font-semibold">Grand total:</span>
                    <span className="text-right font-mono">{basket.reduce((acc, curr) => acc + curr.price, 0)}</span>
                </div>
                <button onClick={order} className="mt-2 w-full p-1 rounded-md bg-indigo-600 transition-colors hover:bg-indigo-500 text-gray-50">Place order</button>
                <button onClick={clearBasket} className="mt-2 w-full p-1 rounded-md bg-rose-600 transition-colors hover:bg-rose-500 text-gray-50">Clear basket</button>
            </div>
            {/* {basket.map((i, idx) => <p key={idx}>{i.id}</p>)} */}
        </div>
    )
}