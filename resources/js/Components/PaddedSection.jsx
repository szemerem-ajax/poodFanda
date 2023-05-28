export default function PaddedSection({ children, className, ...props }) {
    return (
        <section className={`bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg ${className}`}>
            <div className="p-3 text-gray-900 dark:text-gray-100">
                <div {...props}>
                    {children}
                </div>
            </div>
        </section>
    );
}
