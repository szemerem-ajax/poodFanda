import PaddedSection from "@/Components/PaddedSection";
import { useContext } from "react";
import { BasketContext } from "../Dashboard";

export default function FoodView({ auth, food }) {
    const [, setBasket] = useContext(BasketContext);

    function order() {
        setBasket(b => [...b, food]);
    }

    return (
        <div className="flex-shrink-0">
            <PaddedSection className='flex flex-col'>
                {food.name} from {food.restaurant.name}
                <button onClick={order} className="bg-indigo-500 rounded-md">Order this!</button>
            </PaddedSection>
        </div>
    );
}
