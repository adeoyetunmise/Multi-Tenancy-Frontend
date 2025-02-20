import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TenantDashboard from "./pages/TenantDashboard"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TenantDashboard/>} />
            </Routes>
        </Router>
    );
};

export default App;
