import React, { useEffect } from "react";
import {
  Users,
  Stethoscope,
  Calendar,
  Menu,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../Redux/SideBar";
import SideBar from "../Components/SideBar";
import { apiClient } from "../Components/Axios";
import { RootState } from "../Redux/Store";
import { setHospitalData } from "../Redux/Dashboard";

const HospitalDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { name, image, address, phone, email, specialties, booking } =
    useSelector((state: RootState) => state.Dashboard);
  useEffect(() => {
    const getData = async () => {
      await apiClient
        .get("/api/hospital/details", { withCredentials: true })
        .then((result) => {
          dispatch(setHospitalData(result.data.data));
        })
        .catch((err) => console.log("err", err));
    };
    getData();
  }, []);

  return (
    <div className="flex h-screen bg-green-50">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="md:hidden p-2 rounded-md border border-green-600 text-green-600 hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-green-800">Dashboard</h1>
            <div className="text-green-600 text-sm">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-green-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md mb-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={image.imageUrl}
                  alt={name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border border-green-950"
                />
                <h2 className="text-2xl font-bold text-green-800">{name}</h2>
              </div>
              <div className="space-y-2">
                <p className="text-green-600 flex items-center">
                  <MapPin size={16} className="mr-2" />
                  {address}
                </p>
                <p className="text-green-600 flex items-center">
                  <Phone size={16} className="mr-2" />
                  {phone}
                </p>
                <p className="text-green-600 flex items-center">
                  <Mail size={16} className="mr-2" />
                  {email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Link to="/doctors" className="block">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">
                    Doctors
                  </h3>
                  <div className="flex items-center justify-between">
                    <Users size={48} className="text-green-600" />
                    <span className="text-3xl font-bold text-green-800">
                      {specialties.length}
                    </span>
                  </div>
                  <div className="text-green-600 mt-4 inline-block">
                    Manage Doctors
                  </div>
                </div>
              </Link>
              <Link to="/specialties" className="block">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">
                    Specialties
                  </h3>
                  <div className="flex items-center justify-between">
                    <Stethoscope size={48} className="text-green-600" />
                    <span className="text-3xl font-bold text-green-800">
                      {specialties.length}
                    </span>
                  </div>
                  <div className="text-green-600 mt-4 inline-block">
                    Manage Specialties
                  </div>
                </div>
              </Link>
              <Link to="/appointments" className="block">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">
                    Today's Appointments
                  </h3>
                  <div className="flex items-center justify-between">
                    <Calendar size={48} className="text-green-600" />
                    <span className="text-3xl font-bold text-green-800">
                      {booking.length}
                    </span>
                  </div>
                  <div className="text-green-600 mt-4 inline-block">
                    Manage Schedule
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HospitalDashboard;
