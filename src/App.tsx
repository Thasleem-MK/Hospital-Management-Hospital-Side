import { Route, Routes } from "react-router-dom";
import "./App.css";
import HospitalRegistration from "./pages/Registration";
import HospitalLogin from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import HospitalHomePage from "./pages/Home";
import HospitalDashboard from "./pages/HospitalDashboard";
import DoctorManagement from "./pages/Doctors";
import SpecialtyManagement from "./pages/Specialty";
import AppointmentsManagement from "./pages/Appointment";
import HospitalProfile from "./pages/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HospitalHomePage />} />
        <Route path="/registration" element={<HospitalRegistration />} />
        <Route path="/login" element={<HospitalLogin />} />
        <Route path="/newpassword" element={<PasswordReset />} />
        <Route path="/dashboard" element={<HospitalDashboard />} />
        <Route path="/doctors" element={<DoctorManagement />} />
        <Route path="/specialties" element={<SpecialtyManagement />} />
        <Route path="/appointments" element={<AppointmentsManagement />} />
        <Route path="/profile" element={<HospitalProfile />} />
      </Routes>
    </div>
  );
}

export default App;
