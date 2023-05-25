import PaddedSection from "@/Components/PaddedSection";
import { useContext } from "react";
import { BasketContext } from "../Dashboard";

const PlaceHolderUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

export default function FoodView({ auth, food }) {
    const [, setBasket] = useContext(BasketContext);

    function order() {
        setBasket(b => [...b, food]);
    }

    return (
        <div className="flex-shrink-0">
            <PaddedSection className='flex flex-col'>
                <h2 className="text-xl">{food.name}</h2>
                <h3 className="text-gray-400">{food.restaurant.name}</h3>
                <ul className="flex gap-1 my-1">
                    {food.categories.map((cat, index) =>
                        <li key={index} className="bg-gray-100 text-gray-800 text-sm px-1 py-0.5 rounded-lg">
                            {cat.name}
                        </li>)}
                </ul>
                <img className="w-80 h-56 my-2 object-cover object-center" src={food.image_url ?? PlaceHolderUrl} />
                <button onClick={order} className="bg-indigo-500 rounded-md">Order this!</button>
            </PaddedSection>
        </div>
    );
}
