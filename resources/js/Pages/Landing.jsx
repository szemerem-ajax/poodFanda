import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Landing() {
    return (
        <GuestLayout>
            <Head title='Landing' />

            <div className="grid place-items-center text-center">
                <h1 className='text-2xl font-semibold'>Welcome to <span className='italic text-indigo-500'>poodFanda</span> !</h1>
                <div>
                    You can <Link href={route('login')} className='text-indigo-400'>log in</Link>{' '}
                    or <Link href={route('register')} className='text-indigo-400'>create an account</Link>.
                </div>
            </div>
        </GuestLayout>
    );
}
