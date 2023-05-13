import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PaddedSection from '@/Components/PaddedSection';
import { Head } from '@inertiajs/react';

function Section({ children }) {
    return (
        <PaddedSection className='flex flex-col gap-2 items-center'>
            {children}
        </PaddedSection>
    );
}

export default function Dashboard({ auth }) {
    // What to display here?

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <h1 className="text-2xl md:text-3xl font-semibold dark:text-gray-100 mb-4 md:mb-8">Welcome {auth.user.name}!</h1>

            <div className="flex flex-col gap-2 md:grid md:gap-4 md:grid-cols-2">
                <Section>
                    Row 1 col 1
                </Section>
                <Section>
                    Row 1 col 2
                </Section>
                <Section>
                    Row 2 col 1
                </Section>
                <Section>
                    Row 2 col 2
                </Section>
            </div>
        </AuthenticatedLayout>
    );
}
