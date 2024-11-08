import { Route, Routes } from "react-router-dom";
import HospitalRegistration from "./pages/Registration";
import HospitalLogin from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import HospitalHomePage from "./pages/Home";
import HospitalDashboard from "./pages/HospitalDashboard";
import DoctorManagement from "./pages/Doctors";
import SpecialtyManagement from "./pages/Specialty";
// import AppointmentsManagement from "./pages/Appointment";
import HospitalProfile from "./pages/Profile";
import { useEffect } from "react";
import { fetchData } from "./Components/FetchData";
import { useDispatch } from "react-redux";
import { setHospitalData } from "./Redux/Dashboard";
import { HomeProtector, Protector } from "./Components/Protector";
import SettingsPage from "./pages/Settings";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(dispatch, setHospitalData);
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomeProtector>
              <HospitalHomePage />
            </HomeProtector>
          }
        />
        <Route path="/registration" element={<HospitalRegistration />} />
        <Route path="/login" element={<HospitalLogin />} />
        <Route
          path="/newpassword"
          element={
            <Protector>
              <PasswordReset />
            </Protector>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protector>
              <HospitalDashboard />
            </Protector>
          }
        />
        <Route
          path="/doctors"
          element={
            <Protector>
              <DoctorManagement />
            </Protector>
          }
        />
        <Route
          path="/specialties"
          element={
            <Protector>
              <SpecialtyManagement />
            </Protector>
          }
        />
        {/* <Route path="/appointments" element={<AppointmentsManagement />} /> */}
        <Route
          path="/profile"
          element={
            <Protector>
              <HospitalProfile />
            </Protector>
          }
        />
        <Route
          path="/profile"
          element={
            <Protector>
              <HospitalProfile />
            </Protector>
          }
        />
        <Route
          path="/settings"
          element={
            <Protector>
              <SettingsPage />
            </Protector>
          }
        />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
      </Routes>
    </div>
  );
}

export default App;
