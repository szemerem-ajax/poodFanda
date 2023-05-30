import PaddedSection from "@/Components/PaddedSection";
import PrimaryButton from "@/Components/PrimaryButton";
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
                        <li key={index} className="bg-gray-300 dark:bg-gray-900 border border-gray-900 dark:border-gray-300 text-gray-900 dark:text-gray-300 text-sm px-1 py-0.5 rounded-lg">
                            {cat.name}
                        </li>)}
                </ul>
                <img className="w-80 h-56 my-2 object-cover object-center border-2 border-gray-300 rounded-md" src={food.image_url ?? PlaceHolderUrl} />
                <div className="flex items-center justify-between">
                    <span>{food.price} Ft</span>
                    <PrimaryButton onClick={order} className="self-center">Order this!</PrimaryButton>
                </div>
            </PaddedSection>
        </div>
    );
}
