import { Hospital, Settings, Stethoscope, User, Users, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../Redux/Store";
import { toggleSidebar } from "../Redux/SideBar";

const SideBar = () => {
  const { openSidebar } = useSelector((state: RootState) => state.Sidebar);
  const dispatch = useDispatch();
  return (
    <aside
      className={`bg-green-800 text-white w-64 min-h-screen p-4 ${
        openSidebar ? "block" : "hidden"
      } md:block fixed md:static z-50`}
    >
      <div className="flex justify-between items-center mb-6">
        <span className="text-2xl font-semibold">Dashboard</span>
        <button
          onClick={() => {
            dispatch(toggleSidebar());
          }}
          className="md:hidden"
        >
          <X size={24} />
        </button>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 bg-green-700 text-white p-2 rounded-md"
            >
              <Hospital size={20} />
              <span>Overview</span>
            </Link>
          </li>

          <li>
            <Link
              to="/specialties"
              className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md"
            >
              <Stethoscope size={20} />
              <span>Specialties</span>
            </Link>
          </li>
          <li>
            <Link
              to="/doctors"
              className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md"
            >
              <Users size={20} />
              <span>Doctors</span>
            </Link>
          </li>

          {/* <li>
            <Link
              to="/appointments"
              className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md"
            >
              <Calendar size={20} />
              <span>Appointments</span>
            </Link>
          </li> */}
          <li>
            <Link
              to="/profile"
              className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md"
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md"
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="text-sm absolute bottom-4 left-4">
        <p>Service Support:</p>
        <p className="font-bold">+91 8714412090</p>
      </div>
    </aside>
  );
};

export default SideBar;
