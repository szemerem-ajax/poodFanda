import PaddedSection from "@/Components/PaddedSection";

export default function FoodView({ auth, food }) {
    return (
        <div className="flex-shrink-0">
            <PaddedSection className='h-10'>
                {food.name} from {food.restaurant.name}
            </PaddedSection>
        </div>
    );
}
