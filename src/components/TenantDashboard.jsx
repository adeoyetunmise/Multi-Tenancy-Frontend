import { useState, useEffect } from "react";

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch tenants from the backend
  const fetchTenants = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tenants"); // Adjust API URL if needed
      const data = await response.json();
      setTenants(data);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  // Filter tenants based on search input
  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tenant List</h2>
      <input
        type="text"
        placeholder="Search tenants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <ul className="border rounded p-4 bg-white shadow-md">
        {filteredTenants.length > 0 ? (
          filteredTenants.map((tenant) => (
            <li
              key={tenant.id}
              className="p-3 border-b last:border-none flex justify-between"
            >
              <span>{tenant.name}</span>
              <span className="text-gray-500 text-sm">
                {new Date(tenant.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))
        ) : (
          <p>No tenants found.</p>
        )}
      </ul>
    </div>
  );
};

export default TenantList;
