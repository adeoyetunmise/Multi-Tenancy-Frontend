import axios from "axios";

const API_URL = "http://localhost:5000/api/tenants"; 

export const fetchTenants = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching tenants:", error);
        return [];
    }
};

export const addTenant = async (tenant) => {
    try {
        const response = await axios.post(API_URL, tenant);
        return response.data;
    } catch (error) {
        console.error("Error adding tenant:", error);
        throw error;
    }
};

export const deleteTenant = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting tenant:", error);
    }
};
