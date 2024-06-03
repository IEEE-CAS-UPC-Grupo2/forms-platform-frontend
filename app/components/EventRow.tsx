"use client";

import { PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/outline'
import { formatEventDate } from "../utils/formatDate";
import { useRouter } from "next/navigation";

interface EventRowProps {
    EventTitle: string;
    EventDateAndTime: string;
    id: string;
}

export const EventRow: React.FC<EventRowProps> = ({
    EventTitle,
    EventDateAndTime,
    id
}) => {
    const router = useRouter();

    const handleEdit = () => {
        //redirigir al usuario a la página de edición
        router.push(`/[admin_token]/panel/${id}`);
    };

    const handleViewClick = () => {
        //visualizar evento
        router.push(`/[admin_token]/panel/view/${id}`);
    };

    const handleDelete = () => {
        //lógica para eliminar el evento
    };

    return (
        <div className="flex justify-between items-center p-2 border-b">
            <div className="flex-1 flex justify-center items-center">{EventTitle}</div>
            <div className="flex-1 flex justify-center items-center">{formatEventDate(EventDateAndTime)}</div>
            <div className="flex-1 flex justify-center items-center space-x-6">
                <button onClick={handleEdit} className="bg-green-500 p-2 rounded-full">
                    <PencilIcon className="h-5 w-5 text-blue-500" />
                </button>
                <button onClick={handleView} className="bg-green-500 p-2 rounded-full">
                    <EyeIcon className="h-5 w-5 text-green-500" />
                </button>
                <button onClick={handleDelete} className="bg-green-500 p-2 rounded-full">
                    <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
            </div>
        </div>
    );
};
