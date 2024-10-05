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
//   photo: "/placeholder.svg?height=200&width=200",
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
// <div className="absolute bottom-4 left-4">
//   <button className="flex items-center space-x-2 hover:bg-green-700 p-2 rounded-md">
//     <LogOut size={20} />
//     <span>Logout</span>
//   </button>
// </div>
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
  ClipboardList,
  LogOut,
  Settings,
  Edit2,
  Camera,
  PhoneIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for the hospital
const hospitalData = {
  name: "City General Hospital",
  image: "/placeholder.svg?height=200&width=200",
  address: "123 Healthcare Ave, Medical City, MC 12345",
  phone: "(555) 123-4567",
  email: "info@citygeneralhospital.com",
  website: "www.citygeneralhospital.com",
  description:
    "City General Hospital is a leading healthcare provider, offering comprehensive medical services with state-of-the-art facilities and compassionate care.",
};

const HospitalDashboard: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(hospitalData);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saving updated data:", editedData);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white p-6">
        <div className="flex items-center mb-8">
          <Hospital className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">MediConnect</span>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center py-2 px-4 rounded hover:bg-green-700"
              >
                <ClipboardList className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="flex items-center py-2 px-4 rounded hover:bg-green-700"
              >
                <Hospital className="h-5 w-5 mr-2" />
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/doctors"
                className="flex items-center py-2 px-4 rounded hover:bg-green-700"
              >
                <Users className="h-5 w-5 mr-2" />
                Doctors
              </Link>
            </li>
            <li>
              <Link
                to="/specialties"
                className="flex items-center py-2 px-4 rounded hover:bg-green-700"
              >
                <Stethoscope className="h-5 w-5 mr-2" />
                Specialties
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center py-2 px-4 rounded hover:bg-green-700"
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto">
          <button className="flex items-center py-2 px-4 rounded hover:bg-green-700 w-full">
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/settings"
                className="flex items-center py-2 px-4 rounded hover:bg-green-700"
              >
                <PhoneIcon className="h-5 w-5 mr-2" />
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-green-800">
              Hospital Dashboard
            </h1>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
              >
                <Edit2 className="h-5 w-5 mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="relative">
                <img
                  src={editedData.image}
                  alt={editedData.name}
                  className="w-full h-auto rounded-lg shadow-md"
                />
                {isEditing && (
                  <div className="absolute bottom-2 right-2">
                    <label
                      htmlFor="imageUpload"
                      className="bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors"
                    >
                      <Camera className="h-5 w-5" />
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    name="address"
                    value={editedData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={editedData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="url"
                    name="website"
                    value={editedData.website}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <textarea
                    name="description"
                    value={editedData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-green-800">
                    {editedData.name}
                  </h2>
                  <p className="text-green-600">{editedData.address}</p>
                  <p className="text-green-600">{editedData.phone}</p>
                  <p className="text-green-600">{editedData.email}</p>
                  <p className="text-green-600">{editedData.website}</p>
                  <p className="text-green-700">{editedData.description}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Additional dashboard widgets could be added here */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Quick Stats
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-green-600">Total Doctors:</span>
                <span className="font-semibold">42</span>
              </li>
              <li className="flex justify-between">
                <span className="text-green-600">Specialties:</span>
                <span className="font-semibold">12</span>
              </li>
              <li className="flex justify-between">
                <span className="text-green-600">Appointments Today:</span>
                <span className="font-semibold">28</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Recent Activity
            </h3>
            <ul className="space-y-2">
              <li className="text-green-600">
                Dr. Smith updated their schedule
              </li>
              <li className="text-green-600">
                New appointment booked for Cardiology
              </li>
              <li className="text-green-600">Updated hospital information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
