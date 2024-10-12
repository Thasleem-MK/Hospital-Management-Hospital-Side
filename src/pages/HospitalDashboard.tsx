// import React, { useState } from "react";
// import {
//   Users,
//   Stethoscope,
//   Calendar,
//   Menu,
//   Phone,
//   Mail,
//   MapPin,
//   AlertCircle,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { toggleSidebar } from "../Redux/SideBar";
// import SideBar from "../Components/SideBar";

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
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState(hospitalData);
//   const dispatch = useDispatch();

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = () => {
//     // Here you would typically send the editedData to your backend
//     console.log("Saving edited data:", editedData);
//     setIsEditing(false);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditedData((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="flex h-screen bg-green-50">
//       {/* Sidebar */}
//       <SideBar />
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Updated Top Navigation */}
//         <header className="bg-white shadow-md">
//           <div className="flex items-center justify-between p-4">
//             <button
//               onClick={() => dispatch(toggleSidebar())}
//               className="md:hidden p-2 rounded-md border border-green-600 text-green-600 hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               <Menu size={24} />
//             </button>
//             <h1 className="text-xl font-semibold text-green-800">Welcome</h1>
//             <div className="text-green-600 text-sm">
//               {new Date().toLocaleDateString()}
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-green-50 p-6">
//           <div className="grid grid-cols-1 gap-6 mb-6">
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
//                 <img
//                   src={editedData.photo}
//                   alt={editedData.name}
//                   className="w-24 h-24 rounded-full object-cover"
//                 />
//                 <div className="flex-grow">
//                   {isEditing ? (
//                     <input
//                       type="text"
//                       name="name"
//                       value={editedData.name}
//                       onChange={handleChange}
//                       className="text-2xl font-bold text-green-800 border-b border-green-300 focus:outline-none focus:border-green-500"
//                     />
//                   ) : (
//                     <h2 className="text-2xl font-bold text-green-800">
//                       {editedData.name}
//                     </h2>
//                   )}
//                   <p className="text-green-600 flex items-center mt-2">
//                     <MapPin size={16} className="mr-1" />
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="address"
//                         value={editedData.address}
//                         onChange={handleChange}
//                         className="border-b border-green-300 focus:outline-none focus:border-green-500"
//                       />
//                     ) : (
//                       editedData.address
//                     )}
//                   </p>
//                   <p className="text-green-600 flex items-center mt-1">
//                     <Phone size={16} className="mr-1" />
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="phone"
//                         value={editedData.phone}
//                         onChange={handleChange}
//                         className="border-b border-green-300 focus:outline-none focus:border-green-500"
//                       />
//                     ) : (
//                       editedData.phone
//                     )}
//                   </p>
//                   <p className="text-green-600 flex items-center mt-1">
//                     <Mail size={16} className="mr-1" />
//                     {isEditing ? (
//                       <input
//                         type="text"
//                         name="email"
//                         value={editedData.email}
//                         onChange={handleChange}
//                         className="border-b border-green-300 focus:outline-none focus:border-green-500"
//                       />
//                     ) : (
//                       editedData.email
//                     )}
//                   </p>
//                 </div>
//                 <button
//                   onClick={isEditing ? handleSave : handleEdit}
//                   className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
//                 >
//                   {isEditing ? "Save" : "Edit"}
//                 </button>
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
//                     {editedData.emergencyNumber}
//                   </span>
//                 </li>
//                 <li className="flex items-center justify-between">
//                   <span className="text-green-600">Working Hours:</span>
//                   <span className="font-semibold">
//                     {editedData.workingHours}
//                   </span>
//                 </li>
//                 <li className="flex items-center justify-between">
//                   <span className="text-green-600">Beds Available:</span>
//                   <span className="font-semibold">
//                     {editedData.bedsAvailable}
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <Link to={"/doctors"}>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-green-800 mb-4">
//                   Doctors
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <Users size={48} className="text-green-600" />
//                   <span className="text-3xl font-bold text-green-800">
//                     {editedData.doctors}
//                   </span>
//                 </div>
//                 <div className="text-green-600 mt-4 inline-block">
//                   Manage Doctors
//                 </div>
//               </div>
//             </Link>
//             <Link to={"/specialties"}>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-green-800 mb-4">
//                   Specialties
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <Stethoscope size={48} className="text-green-600" />
//                   <span className="text-3xl font-bold text-green-800">
//                     {editedData.specialties}
//                   </span>
//                 </div>
//                 <div className="text-green-600 mt-4 inline-block">
//                   View Specialties
//                 </div>
//               </div>
//             </Link>
//             <Link to={"/appointments"}>
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-green-800 mb-4">
//                   Today's Appointments
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <Calendar size={48} className="text-green-600" />
//                   <span className="text-3xl font-bold text-green-800">15</span>
//                 </div>
//                 <div className="text-green-600 mt-4 inline-block">
//                   View Schedule
//                 </div>
//               </div>
//             </Link>
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

// import React from "react";
// import {
//   Users,
//   Stethoscope,
//   Calendar,
//   Menu,
//   Phone,
//   Mail,
//   MapPin,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { toggleSidebar } from "../Redux/SideBar";
// import SideBar from "../Components/SideBar";

// // Mock data for the hospital
// const hospitalData = {
//   name: "City General Hospital",
//   photo: "/placeholder.svg?height=200&width=200",
//   address: "123 Healthcare Avenue, Medicity, MC 12345",
//   phone: "+1 (555) 123-4567",
//   email: "info@citygeneralhospital.com",
//   doctors: 120,
//   specialties: 25,
// };

// const HospitalDashboard: React.FC = () => {
//   const dispatch = useDispatch();

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <SideBar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-white shadow-md">
//           <div className="flex items-center justify-between p-4">
//             <button
//               onClick={() => dispatch(toggleSidebar())}
//               className="md:hidden p-2 rounded-md border border-primary text-primary hover:bg-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
//             >
//               <Menu size={24} />
//             </button>
//             <h1 className="text-xl font-semibold text-primary">Dashboard</h1>
//             <div className="text-primary-foreground text-sm">
//               {new Date().toLocaleDateString()}
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="bg-white p-8 rounded-lg shadow-md mb-6">
//               <div className="flex flex-col items-center mb-6">
//                 <img
//                   src={hospitalData.photo}
//                   alt={hospitalData.name}
//                   className="w-32 h-32 rounded-full object-cover mb-4"
//                 />
//                 <h2 className="text-2xl font-bold text-primary">
//                   {hospitalData.name}
//                 </h2>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-primary-foreground flex items-center">
//                   <MapPin size={16} className="mr-2" />
//                   {hospitalData.address}
//                 </p>
//                 <p className="text-primary-foreground flex items-center">
//                   <Phone size={16} className="mr-2" />
//                   {hospitalData.phone}
//                 </p>
//                 <p className="text-primary-foreground flex items-center">
//                   <Mail size={16} className="mr-2" />
//                   {hospitalData.email}
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//               <Link to="/doctors" className="block">
//                 <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                   <h3 className="text-xl font-semibold text-primary mb-4">
//                     Doctors
//                   </h3>
//                   <div className="flex items-center justify-between">
//                     <Users size={48} className="text-primary" />
//                     <span className="text-3xl font-bold text-primary">
//                       {hospitalData.doctors}
//                     </span>
//                   </div>
//                   <div className="text-primary-foreground mt-4 inline-block">
//                     Manage Doctors
//                   </div>
//                 </div>
//               </Link>
//               <Link to="/specialties" className="block">
//                 <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                   <h3 className="text-xl font-semibold text-primary mb-4">
//                     Specialties
//                   </h3>
//                   <div className="flex items-center justify-between">
//                     <Stethoscope size={48} className="text-primary" />
//                     <span className="text-3xl font-bold text-primary">
//                       {hospitalData.specialties}
//                     </span>
//                   </div>
//                   <div className="text-primary-foreground mt-4 inline-block">
//                     View Specialties
//                   </div>
//                 </div>
//               </Link>
//               <Link to="/appointments" className="block">
//                 <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//                   <h3 className="text-xl font-semibold text-primary mb-4">
//                     Today's Appointments
//                   </h3>
//                   <div className="flex items-center justify-between">
//                     <Calendar size={48} className="text-primary" />
//                     <span className="text-3xl font-bold text-primary">15</span>
//                   </div>
//                   <div className="text-primary-foreground mt-4 inline-block">
//                     View Schedule
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default HospitalDashboard;

import React from "react";
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
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../Redux/SideBar";
import SideBar from "../Components/SideBar";

// Mock data for the hospital
const hospitalData = {
  name: "City General Hospital",
  photo: "/placeholder.svg?height=200&width=200",
  address: "123 Healthcare Avenue, Medicity, MC 12345",
  phone: "+1 (555) 123-4567",
  email: "info@citygeneralhospital.com",
  doctors: 120,
  specialties: 25,
};

const HospitalDashboard: React.FC = () => {
  const dispatch = useDispatch();

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
                  src={hospitalData.photo}
                  alt={hospitalData.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border border-green-950"
                />
                <h2 className="text-2xl font-bold text-green-800">
                  {hospitalData.name}
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-green-600 flex items-center">
                  <MapPin size={16} className="mr-2" />
                  {hospitalData.address}
                </p>
                <p className="text-green-600 flex items-center">
                  <Phone size={16} className="mr-2" />
                  {hospitalData.phone}
                </p>
                <p className="text-green-600 flex items-center">
                  <Mail size={16} className="mr-2" />
                  {hospitalData.email}
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
                      {hospitalData.doctors}
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
                      {hospitalData.specialties}
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
                      15
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
