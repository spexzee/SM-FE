import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./RouterProtect";
import Dashboard from "../pages/Dashboard";


const MainRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Route>
      
    </Routes>
  );
}

export default MainRouters
