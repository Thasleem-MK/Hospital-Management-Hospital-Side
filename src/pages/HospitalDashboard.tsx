// import React, { useState } from "react";
// import {
//   Hospital,
//   Users,
//   Stethoscope,
//   Calendar,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   Phone,
//   Mail,
//   MapPin,
//   AlertCircle,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// // Mock data for the hospital
// const hospitalData = {
//   name: "City General Hospital",
//   photo:
//     "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
//   address: "123 Healthcare Avenue, Medicity, MC 12345",
//   phone: "+1 (555) 123-4567",
//   email: "info@citygeneralhospital.com",
//   emergencyNumber: "911",
//   workingHours: "24/7",
//   bedsAvailable: 50,
//   doctors: 120,
//   specialties: 25,
// };

// const HospitalDashboard: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   return (
//     <div className="flex h-screen bg-green-50">
//       {/* Sidebar */}
//       <aside
//         className={`bg-green-800 text-white w-64 min-h-screen p-4 ${
//           sidebarOpen ? "block" : "hidden"
//         } md:block`}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <span className="text-2xl font-semibold">Dashboard</span>
//           <button onClick={toggleSidebar} className="md:hidden">
//             <X size={24} />
//           </button>
//         </div>
//         <nav>
//           <ul className="space-y-2">
//             <li>
//               <Link
//                 to="/dashboard"
//                 className="flex items-center space-x-2 bg-green-700 text-white p-2 rounded-md"
//               >
//                 <Hospital size={20} />
//                 <span>Overview</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/doctors"
//                 className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md"
//               >
//                 <Users size={20} />
//                 <span>Doctors</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/specialties"
//                 className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md"
//               >
//                 <Stethoscope size={20} />
//                 <span>Specialties</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/appointments"
//                 className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md"
//               >
//                 <Calendar size={20} />
//                 <span>Appointments</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/settings"
//                 className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md"
//               >
//                 <Settings size={20} />
//                 <span>Settings</span>
//               </Link>
//             </li>
//           </ul>
//         </nav>
//         <div className="absolute bottom-10 left-4">
//           <button className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md">
//             <LogOut size={20} />
//             <span>Logout</span>
//           </button>
//         </div>
//         <div className="text-sm absolute bottom-4 left-4 flex justify-between">
//           <p>Service Support:</p>
//           <p className="font-bold">(800) 123-4567</p>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Navigation */}
//         <header className="bg-white shadow-md">
//           <div className="flex items-center justify-between p-4">
//             <button onClick={toggleSidebar} className="md:hidden">
//               <Menu size={24} />
//             </button>
//             <h1 className="text-2xl font-semibold text-green-800">
//               Welcome, {hospitalData.name}
//             </h1>
//             <div className="flex items-center space-x-2">
//               <span className="text-green-600">
//                 {new Date().toLocaleDateString()}
//               </span>
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-green-50 p-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
//               <div className="flex items-start space-x-4">
//                 <img
//                   src={hospitalData.photo}
//                   alt={hospitalData.name}
//                   className="w-24 h-24 rounded-full object-cover"
//                 />
//                 <div>
//                   <h2 className="text-2xl font-bold text-green-800">
//                     {hospitalData.name}
//                   </h2>
//                   <p className="text-green-600 flex items-center mt-2">
//                     <MapPin size={16} className="mr-1" />
//                     {hospitalData.address}
//                   </p>
//                   <p className="text-green-600 flex items-center mt-1">
//                     <Phone size={16} className="mr-1" />
//                     {hospitalData.phone}
//                   </p>
//                   <p className="text-green-600 flex items-center mt-1">
//                     <Mail size={16} className="mr-1" />
//                     {hospitalData.email}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">
//                 Quick Info
//               </h3>
//               <ul className="space-y-2">
//                 <li className="flex items-center justify-between">
//                   <span className="text-green-600">Emergency Number:</span>
//                   <span className="font-semibold">
//                     {hospitalData.emergencyNumber}
//                   </span>
//                 </li>
//                 <li className="flex items-center justify-between">
//                   <span className="text-green-600">Working Hours:</span>
//                   <span className="font-semibold">
//                     {hospitalData.workingHours}
//                   </span>
//                 </li>
//                 <li className="flex items-center justify-between">
//                   <span className="text-green-600">Beds Available:</span>
//                   <span className="font-semibold">
//                     {hospitalData.bedsAvailable}
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">
//                 Doctors
//               </h3>
//               <div className="flex items-center justify-between">
//                 <Users size={48} className="text-green-600" />
//                 <span className="text-3xl font-bold text-green-800">
//                   {hospitalData.doctors}
//                 </span>
//               </div>
//               <Link
//                 to="/doctors"
//                 className="text-green-600 hover:underline mt-4 inline-block"
//               >
//                 Manage Doctors
//               </Link>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">
//                 Specialties
//               </h3>
//               <div className="flex items-center justify-between">
//                 <Stethoscope size={48} className="text-green-600" />
//                 <span className="text-3xl font-bold text-green-800">
//                   {hospitalData.specialties}
//                 </span>
//               </div>
//               <Link
//                 to="/specialties"
//                 className="text-green-600 hover:underline mt-4 inline-block"
//               >
//                 View Specialties
//               </Link>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold text-green-800 mb-4">
//                 Today's Appointments
//               </h3>
//               <div className="flex items-center justify-between">
//                 <Calendar size={48} className="text-green-600" />
//                 <span className="text-3xl font-bold text-green-800">15</span>
//               </div>
//               <Link
//                 to="/appointments"
//                 className="text-green-600 hover:underline mt-4 inline-block"
//               >
//                 View Schedule
//               </Link>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold text-green-800 mb-4">
//               Recent Notifications
//             </h3>
//             <ul className="space-y-2">
//               <li className="flex items-start space-x-2 text-green-600">
//                 <AlertCircle size={20} className="mt-1 flex-shrink-0" />
//                 <span>
//                   New appointment request for Dr. Smith in Cardiology.
//                 </span>
//               </li>
//               <li className="flex items-start space-x-2 text-green-600">
//                 <AlertCircle size={20} className="mt-1 flex-shrink-0" />
//                 <span>
//                   Updated COVID-19 protocols received. Please review and
//                   implement.
//                 </span>
//               </li>
//               <li className="flex items-start space-x-2 text-green-600">
//                 <AlertCircle size={20} className="mt-1 flex-shrink-0" />
//                 <span>
//                   Reminder: Staff meeting tomorrow at 9 AM in Conference Room A.
//                 </span>
//               </li>
//             </ul>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default HospitalDashboard;







import React, { useState } from "react";
import {
  Hospital,
  Users,
  Stethoscope,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for the hospital
const hospitalData = {
  name: "City General Hospital",
  photo:
    "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
  address: "123 Healthcare Avenue, Medicity, MC 12345",
  phone: "+1 (555) 123-4567",
  email: "info@citygeneralhospital.com",
  emergencyNumber: "911",
  workingHours: "24/7",
  bedsAvailable: 50,
  doctors: 120,
  specialties: 25,
};

const HospitalDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(hospitalData);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically send the editedData to your backend
    console.log("Saving edited data:", editedData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <aside
        className={`bg-green-800 text-white w-64 min-h-screen p-4 ${
          sidebarOpen ? "block" : "hidden"
        } md:block fixed md:static z-50`}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-semibold">Dashboard</span>
          <button onClick={toggleSidebar} className="md:hidden">
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
                to="/doctors"
                className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md"
              >
                <Users size={20} />
                <span>Doctors</span>
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
                to="/appointments"
                className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md"
              >
                <Calendar size={20} />
                <span>Appointments</span>
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
        <div className="absolute bottom-20 left-4">
          <button className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
        <div className="text-sm absolute bottom-4 left-4">
          <p>Service Support:</p>
          <p className="font-bold">(800) 123-4567</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <button onClick={toggleSidebar} className="md:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-semibold text-green-800">
              Welcome, {editedData.name}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-green-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <img
                  src={editedData.photo}
                  alt={editedData.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-grow">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedData.name}
                      onChange={handleChange}
                      className="text-2xl font-bold text-green-800 border-b border-green-300 focus:outline-none focus:border-green-500"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-green-800">
                      {editedData.name}
                    </h2>
                  )}
                  <p className="text-green-600 flex items-center mt-2">
                    <MapPin size={16} className="mr-1" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={editedData.address}
                        onChange={handleChange}
                        className="border-b border-green-300 focus:outline-none focus:border-green-500"
                      />
                    ) : (
                      editedData.address
                    )}
                  </p>
                  <p className="text-green-600 flex items-center mt-1">
                    <Phone size={16} className="mr-1" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={editedData.phone}
                        onChange={handleChange}
                        className="border-b border-green-300 focus:outline-none focus:border-green-500"
                      />
                    ) : (
                      editedData.phone
                    )}
                  </p>
                  <p className="text-green-600 flex items-center mt-1">
                    <Mail size={16} className="mr-1" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="email"
                        value={editedData.email}
                        onChange={handleChange}
                        className="border-b border-green-300 focus:outline-none focus:border-green-500"
                      />
                    ) : (
                      editedData.email
                    )}
                  </p>
                </div>
                <button
                  onClick={isEditing ? handleSave : handleEdit}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Quick Info
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="text-green-600">Emergency Number:</span>
                  <span className="font-semibold">
                    {editedData.emergencyNumber}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-green-600">Working Hours:</span>
                  <span className="font-semibold">
                    {editedData.workingHours}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-green-600">Beds Available:</span>
                  <span className="font-semibold">
                    {editedData.bedsAvailable}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Doctors
              </h3>
              <div className="flex items-center justify-between">
                <Users size={48} className="text-green-600" />
                <span className="text-3xl font-bold text-green-800">
                  {editedData.doctors}
                </span>
              </div>
              <Link
                to="/doctors"
                className="text-green-600 hover:underline mt-4 inline-block"
              >
                Manage Doctors
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Specialties
              </h3>
              <div className="flex items-center justify-between">
                <Stethoscope size={48} className="text-green-600" />
                <span className="text-3xl font-bold text-green-800">
                  {editedData.specialties}
                </span>
              </div>
              <Link
                to="/specialties"
                className="text-green-600 hover:underline mt-4 inline-block"
              >
                View Specialties
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Today's Appointments
              </h3>
              <div className="flex items-center justify-between">
                <Calendar size={48} className="text-green-600" />
                <span className="text-3xl font-bold text-green-800">15</span>
              </div>
              <Link
                to="/appointments"
                className="text-green-600 hover:underline mt-4 inline-block"
              >
                View Schedule
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Recent Notifications
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-green-600">
                <AlertCircle size={20} className="mt-1 flex-shrink-0" />
                <span>
                  New appointment request for Dr. Smith in Cardiology.
                </span>
              </li>
              <li className="flex items-start space-x-2 text-green-600">
                <AlertCircle size={20} className="mt-1 flex-shrink-0" />
                <span>
                  Updated COVID-19 protocols received. Please review and
                  implement.
                </span>
              </li>
              <li className="flex items-start space-x-2 text-green-600">
                <AlertCircle size={20} className="mt-1 flex-shrink-0" />
                <span>
                  Reminder: Staff meeting tomorrow at 9 AM in Conference Room A.
                </span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HospitalDashboard;