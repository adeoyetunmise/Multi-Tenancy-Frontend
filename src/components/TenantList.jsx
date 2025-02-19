import { useEffect, useState } from "react";
import { fetchTenants, deleteTenant } from "../services/api";

const TenantList = () => {
    const [tenants, setTenants] = useState([]);

    useEffect(() => {
        const getTenants = async () => {
            const data = await fetchTenants();
            setTenants(data);
        };
        getTenants();
    }, []);

    const handleDelete = async (id) => {
        await deleteTenant(id);
        setTenants(tenants.filter(tenant => tenant._id !== id));
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Tenants</h2>
            <ul className="space-y-2">
                {tenants.map((tenant) => (
                    <li key={tenant._id} className="flex justify-between bg-gray-100 p-3 rounded-md">
                        <span>{tenant.name}</span>
                        <button 
                            className="bg-red-500 text-white px-3 py-1 rounded-md"
                            onClick={() => handleDelete(tenant._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TenantList;
