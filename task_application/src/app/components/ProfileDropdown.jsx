import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { logout } from "../state/users/authSlice";
import { useRouter } from "next/navigation";

export default function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const router = useRouter()
    function handleLogout() {
        router.push("/login")
    }
    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center space-x-2 focus:outline-none"
            >
                <UserCircleIcon className="h-8 w-8 text-gray-600 hover:text-gray-800" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white border rounded-lg shadow-md">
                    <button 
                        onClick={handleLogout} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
}