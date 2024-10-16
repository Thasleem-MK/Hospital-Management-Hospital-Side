// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   Plus,
//   Edit,
//   Trash2,
//   ToggleLeft,
//   ToggleRight,
//   X,
// } from "lucide-react";
// import { BackButton } from "../Components/Commen";
// import { useNavigate } from "react-router-dom";
// import { DeleteConfirmationDialog } from "../Components/DeleteConfirmation";
// import { fetchData } from "../Components/FetchData";
// import { useDispatch, useSelector } from "react-redux";
// import { setHospitalData } from "../Redux/Dashboard";
// import { RootState } from "../Redux/Store";

// interface ConsultingSchedule {
//   day: string;
//   startTime: string;
//   endTime: string;
//   isBookingDisabled: boolean;
// }

// interface Doctor {
//   id: number;
//   name: string;
//   specialty: string;
//   consulting: ConsultingSchedule[];
// }

// const mockSpecialties = [
//   "Cardiology",
//   "Pediatrics",
//   "Orthopedics",
//   "Neurology",
//   "Dermatology",
// ];

// const DoctorManagement: React.FC = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
//   const [selectedDay, setSelectedDay] = useState<string>("");
//   const [selectedTime, setSelectedTime] = useState<string>("");
//   const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
//   const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
//   const [showDeleteConfirmation, setShowDeleteConfirmation] =
//     useState<boolean>(false);
//   const [doctorToDelete, setDoctorToDelete] = useState<number | null>(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // to get all doctors
//   // const doctors = useSelector((state: RootState) =>
//   //   state.Dashboard.specialties.flatMap((specialty) => specialty.doctors)
//   // );
//   // const { specialties } = useSelector((state: RootState) => state.Dashboard);

//   useEffect(() => {
//     fetchData(dispatch, setHospitalData);
//   }, []);

//   useEffect(() => {
//     filterDoctors();
//   }, [searchTerm, selectedSpecialty, selectedDay, selectedTime, doctors]);

//   const filterDoctors = () => {
//     let filtered = specialties.filter(
//       (specialty) =>
//         specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         specialty.doctors.filter((doctor) =>
//           doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );

//     if (selectedSpecialty) {
//       filtered = specialties.filter(
//         (specialty) =>
//           (specialty.name === selectedSpecialty &&
//             specialty.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           specialty.doctors.filter((doctor) =>
//             doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//       );
//     }

//     if (selectedDay) {
//       filtered = filtered.filter((doctor) =>
//         doctor.consulting.some((schedule) => schedule.day === selectedDay)
//       );
//     }

//     if (selectedTime) {
//       filtered = filtered.filter((doctor) =>
//         doctor.consulting.some(
//           (schedule) =>
//             schedule.startTime.includes(selectedTime) ||
//             schedule.endTime.includes(selectedTime)
//         )
//       );
//     }

//     // setFilteredDoctors(filtered);
//   };

//   const handleAddDoctor = (newDoctor: Doctor) => {
//     const updatedDoctors = [
//       ...doctors,
//       { ...newDoctor, id: doctors.length + 1 },
//     ];
//     // setDoctors(updatedDoctors);
//     setIsFormOpen(false);
//   };

//   const handleUpdateDoctor = (updatedDoctor: Doctor) => {
//     // const updatedDoctors = doctors.map((doctor) =>
//     //   doctor.id === updatedDoctor.id ? updatedDoctor : doctor
//     // );
//     // setDoctors(updatedDoctors);
//     setIsFormOpen(false);
//     setEditingDoctor(null);
//   };

//   const handleDeleteDoctor = (id: number) => {
//     setDoctorToDelete(id);
//     setShowDeleteConfirmation(true);
//   };

//   const confirmDeleteDoctor = () => {
//     if (doctorToDelete !== null) {
//       // const updatedDoctors = doctors.filter(
//       //   (doctor) => doctor.id !== doctorToDelete
//       // );
//       // setDoctors(updatedDoctors);
//       setShowDeleteConfirmation(false);
//       setDoctorToDelete(null);
//     }
//   };

//   const handleToggleBooking = (doctorId: number, scheduleIndex: number) => {
//     const updatedDoctors = doctors.map((doctor) => {
//       // if (doctor.id === doctorId) {
//       //   const updatedConsulting = [...doctor.consulting];
//       //   updatedConsulting[scheduleIndex] = {
//       //     ...updatedConsulting[scheduleIndex],
//       //     isBookingDisabled:
//       //       !updatedConsulting[scheduleIndex].isBookingDisabled,
//       //   };
//       //   return { ...doctor, consulting: updatedConsulting };
//       // }
//       return doctor;
//     });
//     // setDoctors(updatedDoctors);
//   };

//   const convertTo12HourFormat = (time: string) => {
//     const [hours, minutes] = time.split(":");
//     let period = "AM";
//     let hour = parseInt(hours, 10);

//     if (hour >= 12) {
//       period = "PM";
//       if (hour > 12) hour -= 12;
//     }
//     if (hour === 0) hour = 12;

//     return `${hour}:${minutes} ${period}`;
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="relative mb-6 flex items-center justify-center">
//         <BackButton OnClick={() => navigate("/Dashboard")} />
//         <h1 className="text-3xl font-bold text-green-800">
//           Doctors Management
//         </h1>
//       </div>

//       <div className="mb-6 flex flex-wrap items-center gap-4">
//         <div className="relative flex-grow">
//           <input
//             type="text"
//             placeholder="Search doctors..."
//             className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
//             size={20}
//           />
//         </div>
//         <select
//           className="border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={selectedSpecialty}
//           onChange={(e) => setSelectedSpecialty(e.target.value)}
//         >
//           <option value="">All Specialties</option>
//           {mockSpecialties.map((specialty) => (
//             <option key={specialty} value={specialty}>
//               {specialty}
//             </option>
//           ))}
//         </select>
//         <select
//           className="border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={selectedDay}
//           onChange={(e) => setSelectedDay(e.target.value)}
//         >
//           <option value="">All Days</option>
//           <option value="Monday">Monday</option>
//           <option value="Tuesday">Tuesday</option>
//           <option value="Wednesday">Wednesday</option>
//           <option value="Thursday">Thursday</option>
//           <option value="Friday">Friday</option>
//           <option value="Saturday">Saturday</option>
//           <option value="Sunday">Sunday</option>
//         </select>
//         <select
//           className="border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={selectedTime}
//           onChange={(e) => setSelectedTime(e.target.value)}
//         >
//           <option value="">All Times</option>
//           <option value="AM">Morning</option>
//           <option value="PM">Afternoon</option>
//         </select>
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//           onClick={() => setIsFormOpen(true)}
//         >
//           <Plus size={20} className="inline mr-2" />
//           Add Doctor
//         </button>
//       </div>

//       <DoctorList
//         doctors={filteredDoctors}
//         onEdit={setEditingDoctor}
//         onDelete={handleDeleteDoctor}
//         onToggleBooking={handleToggleBooking}
//         convertTo12HourFormat={convertTo12HourFormat}
//       />

//       {(isFormOpen || editingDoctor) && (
//         <DoctorForm
//           doctor={editingDoctor}
//           onSave={editingDoctor ? handleUpdateDoctor : handleAddDoctor}
//           onCancel={() => {
//             setIsFormOpen(false);
//             setEditingDoctor(null);
//           }}
//           specialties={mockSpecialties}
//         />
//       )}

//       {showDeleteConfirmation && (
//         <DeleteConfirmationDialog
//           onConfirm={confirmDeleteDoctor}
//           onCancel={() => setShowDeleteConfirmation(false)}
//         />
//       )}
//     </div>
//   );
// };

// interface DoctorListProps {
//   doctors: Doctor[];
//   onEdit: (doctor: Doctor) => void;
//   onDelete: (id: number) => void;
//   onToggleBooking: (doctorId: number, scheduleIndex: number) => void;
//   convertTo12HourFormat: (time: string) => string;
// }

// const DoctorList: React.FC<DoctorListProps> = ({
//   doctors,
//   onEdit,
//   onDelete,
//   onToggleBooking,
//   convertTo12HourFormat,
// }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {doctors.map((doctor) => (
//         <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-green-800 mb-2">
//             {doctor.name}
//           </h2>
//           <p className="text-green-600 mb-4">{doctor.specialty}</p>
//           <h3 className="font-semibold text-green-700 mb-2">
//             Consulting Hours:
//           </h3>
//           <ul className="space-y-1 mb-4">
//             {doctor.consulting.map((schedule, index) => (
//               <li
//                 key={index}
//                 className="text-green-600 flex items-center justify-between"
//               >
//                 <span>
//                   {schedule.day}: {convertTo12HourFormat(schedule.startTime)} -{" "}
//                   {convertTo12HourFormat(schedule.endTime)}
//                 </span>
//                 <button
//                   onClick={() => onToggleBooking(doctor.id, index)}
//                   className={`ml-2 ${
//                     schedule.isBookingDisabled
//                       ? "text-red-500"
//                       : "text-green-500"
//                   }`}
//                 >
//                   {schedule.isBookingDisabled ? (
//                     <ToggleLeft size={20} />
//                   ) : (
//                     <ToggleRight size={20} />
//                   )}
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => onEdit(doctor)}
//               className="text-blue-600 hover:text-blue-800"
//             >
//               <Edit size={18} />
//             </button>
//             <button
//               onClick={() => onDelete(doctor.id)}
//               className="text-red-600 hover:text-red-800"
//             >
//               <Trash2 size={18} />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// interface DoctorFormProps {
//   doctor?: Doctor | null;
//   onSave: (doctor: Doctor) => void;
//   onCancel: () => void;
//   specialties: string[];
// }

// const DoctorForm: React.FC<DoctorFormProps> = ({
//   doctor,
//   onSave,
//   onCancel,
//   specialties,
// }) => {
//   const [formData, setFormData] = useState<Doctor>(
//     doctor || { id: 0, name: "", specialty: "", consulting: [] }
//   );

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAddConsulting = () => {
//     setFormData({
//       ...formData,
//       consulting: [
//         ...formData.consulting,
//         { day: "", startTime: "", endTime: "", isBookingDisabled: false },
//       ],
//     });
//   };

//   const handleConsultingChange = (
//     index: number,
//     field: keyof ConsultingSchedule,
//     value: string | boolean
//   ) => {
//     const updatedConsulting = formData.consulting.map((schedule, i) =>
//       i === index ? { ...schedule, [field]: value } : schedule
//     );
//     setFormData({ ...formData, consulting: updatedConsulting });
//   };

//   const handleSave = () => {
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold text-green-800 mb-4">
//           {doctor ? "Edit Doctor" : "Add Doctor"}
//         </h2>

//         <div className="mb-4">
//           <label className="block text-green-700 mb-1">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border border-green-300 rounded-md px-3 py-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-green-700 mb-1">Specialty</label>
//           <select
//             name="specialty"
//             value={formData.specialty}
//             onChange={handleChange}
//             className="w-full border border-green-300 rounded-md px-3 py-2"
//           >
//             <option value="">Select Specialty</option>
//             {specialties.map((specialty) => (
//               <option key={specialty} value={specialty}>
//                 {specialty}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <h3 className="font-semibold text-green-700 mb-2">
//             Consulting Hours:
//           </h3>
//           {formData.consulting.map((schedule, index) => (
//             <div
//               key={index}
//               className="flex flex-wrap items-center space-x-2 mb-2"
//             >
//               <select
//                 value={schedule.day}
//                 onChange={(e) =>
//                   handleConsultingChange(index, "day", e.target.value)
//                 }
//                 className="w-full md:w-1/4 border  border-green-300 rounded-md px-3 py-2 mb-2 md:mb-0"
//               >
//                 <option value="">Select Day</option>
//                 <option value="Monday">Monday</option>
//                 <option value="Tuesday">Tuesday</option>
//                 <option value="Wednesday">Wednesday</option>
//                 <option value="Thursday">Thursday</option>
//                 <option value="Friday">Friday</option>
//                 <option value="Saturday">Saturday</option>
//                 <option value="Sunday">Sunday</option>
//               </select>

//               <input
//                 type="time"
//                 value={schedule.startTime}
//                 onChange={(e) =>
//                   handleConsultingChange(index, "startTime", e.target.value)
//                 }
//                 className="w-full md:w-1/4 border border-green-300 rounded-md px-3 py-2 mb-2 md:mb-0"
//               />
//               <input
//                 type="time"
//                 value={schedule.endTime}
//                 onChange={(e) =>
//                   handleConsultingChange(index, "endTime", e.target.value)
//                 }
//                 className="w-full md:w-1/4 border border-green-300 rounded-md px-3 py-2 mb-2 md:mb-0"
//               />
//               <button
//                 className={`w-full md:w-auto ${
//                   schedule.isBookingDisabled ? "text-red-500" : "text-green-500"
//                 }`}
//                 onClick={() =>
//                   handleConsultingChange(
//                     index,
//                     "isBookingDisabled",
//                     !schedule.isBookingDisabled
//                   )
//                 }
//               >
//                 {schedule.isBookingDisabled ? (
//                   <ToggleLeft size={20} />
//                 ) : (
//                   <ToggleRight size={20} />
//                 )}
//               </button>
//               <button
//                 onClick={() => {
//                   const updatedConsulting = formData.consulting.filter(
//                     (_, i) => i !== index
//                   );
//                   setFormData({ ...formData, consulting: updatedConsulting });
//                 }}
//                 className="text-red-600 hover:text-red-800"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={handleAddConsulting}
//             className="text-green-600 hover:text-green-800"
//           >
//             <Plus size={18} className="inline mr-1" />
//             Add Consulting Hour
//           </button>
//         </div>

//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onCancel}
//             className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorManagement;


import React, { useState, useEffect } from "react";

interface ConsultingSchedule {
  day: string;
  startTime: string;
  endTime: string;
  isBookingDisabled: boolean;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  consulting: ConsultingSchedule[];
}

interface DoctorFormProps {
  doctor: Doctor | null;
  onSave: (doctor: Doctor) => void;
  onCancel: () => void;
  specialties: string[];
}

const DoctorForm: React.FC<DoctorFormProps> = ({
  doctor,
  onSave,
  onCancel,
  specialties,
}) => {
  const [name, setName] = useState(doctor ? doctor.name : "");
  const [specialty, setSpecialty] = useState(doctor ? doctor.specialty : "");
  const [consulting, setConsulting] = useState<ConsultingSchedule[]>(
    doctor
      ? doctor.consulting
      : [
          {
            day: "Monday",
            startTime: "09:00",
            endTime: "17:00",
            isBookingDisabled: false,
          },
        ]
  );

  useEffect(() => {
    if (doctor) {
      setName(doctor.name);
      setSpecialty(doctor.specialty);
      setConsulting(doctor.consulting);
    }
  }, [doctor]);

  const handleSave = () => {
    const newDoctor = {
      id: doctor ? doctor.id : Math.random(),
      name,
      specialty,
      consulting,
    };
    onSave(newDoctor);
  };

  return (
    <div className="bg-white p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {doctor ? "Edit Doctor" : "Add Doctor"}
      </h2>
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Specialty</label>
        <select
          className="w-full border px-3 py-2 rounded-md"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">Select Specialty</option>
          {specialties?.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>
      {/* Consulting schedule can be added here */}
      <div className="flex justify-end gap-2">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-md"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default DoctorForm;