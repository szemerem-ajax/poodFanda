import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import axios from "axios";

export default function UserView({ user, onChange }) {
    const [editing, setEditing] = useState(false);
    const { data, setData, errors, reset } = useForm({
        ...user
    });

    useEffect(() => {
        reset(user);
    }, [user]);

    const submit = async (e) => {
        e.preventDefault();
        setEditing(false);
        await axios.put(route('users.update', data), data);
        onChange();
    };

    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>{user.mobile}</td>
            <td>{user.type}</td>
            <td>
                <PrimaryButton onClick={() => setEditing(true)}>Edit</PrimaryButton>
            </td>
            <Modal show={editing} maxWidth="md">
                <form className="flex flex-col gap-2 p-4 text-gray-900 dark:text-gray-100" onSubmit={submit}>
                    <h1 className="text-2xl font-bold">Change {user.name}</h1>
                    <hr className="border-gray-500" />
                    <div className="flex flex-col gap-1">
                        <InputLabel htmlFor="type">Account type</InputLabel>
                        <SelectInput id="type" options={['user', 'restaurant', 'courier', 'admin']} value={data.type} onChange={e => setData('type', e.target.value)} />
                        <div className="flex flex-row justify-end gap-2 mt-2">
                            <SecondaryButton onClick={() => setEditing(false)}>Cancel</SecondaryButton>
                            <PrimaryButton type="submit">Submit</PrimaryButton>
                        </div>
                    </div>
                </form>
            </Modal>
        </tr>
    );
}
