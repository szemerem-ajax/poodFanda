import PaddedSection from "@/Components/PaddedSection";

export default function Order({ order }) {
    return (
        <PaddedSection className="px-4 py-2 min-w-fit">
            <h2 className="text-center">#{order.id} - {order.status}</h2>
            <hr />
            <ul className="flex flex-col items-end mt-2 list-disc">
                {order.foods.map((food, index) => (
                    <li key={index}>
                        {food.name}
                    </li>
                ))}
            </ul>
        </PaddedSection>
    );
}
