import React, { useState } from "react";
import axios from "axios";

const AddTenantForm = ({ onTenantAdded }) => {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/tenants", {
        name,
        active,
      });

      onTenantAdded(response.data); // Update UI after adding
      setName("");
      setActive(true);
    } catch (err) {
      setError("Failed to add tenant.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-4 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2">Add New Tenant</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-2">
        <label className="block text-sm font-semibold">Tenant Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={active} onChange={() => setActive(!active)} />
          <span>Active</span>
        </label>
      </div>
      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? "Adding..." : "Add Tenant"}
      </button>
    </form>
  );
};

export default AddTenantForm;
