export default function PaddedSection({ children, ...props }) {
    return (
        <section className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-3 text-gray-900 dark:text-gray-100">
                <div {...props}>
                    {children}
                </div>
            </div>
        </section>
    );
}
