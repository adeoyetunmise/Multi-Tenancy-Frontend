import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTenantForm from "../components/AddTenantForm";

const TenantDashboard = () => {
  const [tenants, setTenants] = useState([]);

  const [search, setSearch] = useState("");

  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tenants");
      setTenants(response.data);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  const handleTenantAdded = (newTenant) => {
    setTenants([...tenants, newTenant]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/tenants/${id}`);
      setTenants(tenants.filter((tenant) => tenant.id !== id));
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  const handleEdit = async (tenant) => {
    const newName = prompt("Enter new name:", tenant.name);
    if (!newName) return;

    try {
      await axios.put(`http://localhost:5000/api/tenants/${tenant.id}`, {
        name: newName,
      });
      setTenants(
        tenants.map((t) => (t.id === tenant.id ? { ...t, name: newName } : t))
      );
    } catch (error) {
      console.error("Error updating tenant:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tenant Management Dashboard</h1>
      <AddTenantForm onTenantAdded={handleTenantAdded} /> <br />

      <input
        type="text"
        placeholder="Search tenants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Created At</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id} className="text-center">
              <td className="border border-gray-300 p-2">{tenant.name}</td>
              <td className="border border-gray-300 p-2">
                {new Date(tenant.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 p-2">
                {tenant.active ? "Active" : "Inactive"}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(tenant)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tenant.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantDashboard;
