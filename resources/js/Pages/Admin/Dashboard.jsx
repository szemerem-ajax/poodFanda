import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import UserView from "./Partials/UserView";

export default function Dashboard({ auth }) {
    const [users, setUsers] = useState([]);
    const [change, setChange] = useState(false);

    useEffect(() => {
        axios.get(route('users.index'))
            .then(r => setUsers(r.data.data));
    }, [change]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Admin dashboard</h2>}
        >
            <Head title='Admin' />

            <h1 className="text-2xl md:text-3xl font-semibold dark:text-gray-100 mb-4 md:mb-8">Welcome {auth.user.name}!</h1>

            <h2 className="text-xl font-semibold">List of users:</h2>

            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr className="border-b-2 border-gray-800 dark:border-gray-300">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Mobile</th>
                        <th>Type</th>
                        <th className="w-0"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => <UserView key={index} user={user} onChange={() => setChange(p => !p)} />)}
                </tbody>
            </table>
        </AuthenticatedLayout>
    );
}
