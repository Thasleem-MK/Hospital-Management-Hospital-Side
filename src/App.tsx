import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/pages/Home";
import HospitalRegistration from "./Components/pages/Registration";
import HospitalLogin from "./Components/pages/Login";
import PasswordReset from "./Components/pages/PasswordReset";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<HospitalRegistration />} />
        <Route path="/login" element={<HospitalLogin />} />
        <Route path="/newpassword" element={<PasswordReset />} />
      </Routes>
    </div>
  );
}

export default App;
