import { useContext, useState, useEffect } from "react";
import { BasketContext } from "../Dashboard";
import { router } from "@inertiajs/react";

export default function Basket({ auth }) {
    const [basket, setBasket] = useContext(BasketContext);
    const [niceBasket, setNiceBasket] = useState({});
    const visible = basket.length > 0;

    const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b),a),{});

    useEffect(() => {
        setNiceBasket(groupBy(basket, i => i.id));
    }, [basket]);

    async function order() {
        const foods = basket.map(f => f.id);

        await axios.post(route('orders.store'), {
            userid: auth.user.id,
            foods
        });
        clearBasket();
        router.replace(route('myorders'));
    }

    function clearBasket() {
        setBasket([]);
    }

    function removeItem(id) {
        const index = basket.findIndex(i => i.id == id);
        setBasket(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    }

    return (
        <div className={`fixed ${visible ? 'bottom-0' : '-bottom-full'} right-4 md:right-12 transition-all duration-500 ease-in-out`}>
            <div className="bg-indigo-950 border border-gray-400 border-b-0 p-2 px-4 rounded-t-md min-w-[200px] md:min-w-[300px]">
                <h1 className="text-center text-xl font-medium text-gray-200">Basket</h1>
                <div className="flex flex-col items-center p-2">
                    {Object.keys(niceBasket).map((key, index) =>
                        <div key={index} className="flex items-baseline w-full justify-between">
                            <div className="flex gap-1">
                                <button className="text-rose-600 transition-colors hover:text-rose-500" onClick={() => removeItem(key)}>&#x2717;</button>
                                <span>{niceBasket[key][0].name}</span>
                                <span>x{niceBasket[key].length}</span>
                            </div>
                            <span className="text-right font-mono text-sm">{niceBasket[key][0].price * niceBasket[key].length}</span>
                        </div>
                    )}
                </div>
                <h3 className="font-semibold">Payment method:</h3>
                <div className="flex items-center gap-1">
                    <input id='cash' type="radio" name="payment" />
                    <label htmlFor="cash">Cash</label>
                </div>
                <div className="flex items-center gap-1">
                    <input id='online' type="radio" name="payment" />
                    <label htmlFor="online">Online</label>
                </div>
                <div className="flex items-baseline w-full justify-between">
                    <h2 className="text-lg font-semibold">Grand total:</h2>
                    <span className="text-right font-mono">{basket.reduce((acc, curr) => acc + curr.price, 0)}</span>
                </div>
                <button onClick={order} className="mt-2 w-full p-1 rounded-md bg-indigo-600 transition-colors hover:bg-indigo-500 text-gray-50">Place order</button>
                <button onClick={clearBasket} className="mt-2 w-full p-1 rounded-md bg-rose-600 transition-colors hover:bg-rose-500 text-gray-50">Clear basket</button>
            </div>
            {/* {basket.map((i, idx) => <p key={idx}>{i.id}</p>)} */}
        </div>
    )
}
