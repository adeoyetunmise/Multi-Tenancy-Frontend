import { useState } from "react";
import { addTenant } from "../services/api";

const AddTenantForm = ({ onTenantAdded }) => {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTenant = { name };
        await addTenant(newTenant);
        onTenantAdded();
        setName("");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-md">
            <h2 className="text-xl font-bold mb-2">Add Tenant</h2>
            <input
                type="text"
                placeholder="Tenant Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full mb-2"
                required
            />
        
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Add Tenant
            </button>
        </form>
    );
};

export default AddTenantForm;
