import { useState } from "react";
import TenantList from "../components/TenantList";
import AddTenantForm from "../components/AddTenantForm";

const Dashboard = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Tenant Management Dashboard</h1>
            <AddTenantForm onTenantAdded={() => setRefresh(!refresh)} />
            <TenantList key={refresh} />
        </div>
    );
};

export default Dashboard;
