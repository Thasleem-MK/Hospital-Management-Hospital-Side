import { Route, Routes } from "react-router-dom";
import "./App.css";
import HospitalRegistration from "./Components/pages/Registration";
import HospitalLogin from "./Components/pages/Login";
import PasswordReset from "./Components/pages/PasswordReset";
import HospitalHomePage from "./Components/pages/Home";
import HospitalDashboard from "./Components/pages/HospitalDashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HospitalHomePage />} />
        <Route path="/registration" element={<HospitalRegistration />} />
        <Route path="/login" element={<HospitalLogin />} />
        <Route path="/newpassword" element={<PasswordReset />} />
        <Route path="/dashboard" element={<HospitalDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
