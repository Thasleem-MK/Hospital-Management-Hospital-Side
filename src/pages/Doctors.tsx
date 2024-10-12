// import React, { useState, useEffect } from "react";
// import { Search, Plus, Edit, Trash2, X } from "lucide-react";
// import { BackButton } from "../Components/Commen";
// import { useNavigate } from "react-router-dom";

// // Define types for the doctor data and the schedule
// interface ConsultingSchedule {
//   day: string;
//   time: string;
// }

// interface Doctor {
//   id: number;
//   name: string;
//   specialty: string;
//   consulting: ConsultingSchedule[];
// }

// // Mock data for doctors (replace with actual API calls in a real application)
// const mockDoctors: Doctor[] = [
//   {
//     id: 1,
//     name: "Dr. John Doe",
//     specialty: "Cardiology",
//     consulting: [
//       { day: "Monday", time: "09:00 AM - 01:00 PM" },
//       { day: "Wednesday", time: "02:00 PM - 06:00 PM" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Dr. Jane Smith",
//     specialty: "Pediatrics",
//     consulting: [
//       { day: "Tuesday", time: "10:00 AM - 02:00 PM" },
//       { day: "Thursday", time: "01:00 PM - 05:00 PM" },
//     ],
//   },
//   {
//     id: 3,
//     name: "Dr. Mike Johnson",
//     specialty: "Orthopedics",
//     consulting: [
//       { day: "Monday", time: "02:00 PM - 06:00 PM" },
//       { day: "Friday", time: "09:00 AM - 01:00 PM" },
//     ],
//   },
// ];

// const mockSpecialties = [
//   "Cardiology",
//   "Pediatrics",
//   "Orthopedics",
//   "Neurology",
//   "Dermatology",
// ];

// const DoctorManagement: React.FC = () => {
//   const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
//   const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(mockDoctors);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSpecialty, setSelectedSpecialty] = useState("");
//   const [selectedDay, setSelectedDay] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     filterDoctors();
//   }, [searchTerm, selectedSpecialty, selectedDay, selectedTime]);

//   const filterDoctors = () => {
//     let filtered = doctors.filter(
//       (doctor) =>
//         doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     if (selectedSpecialty) {
//       filtered = filtered.filter(
//         (doctor) => doctor.specialty === selectedSpecialty
//       );
//     }

//     if (selectedDay) {
//       filtered = filtered.filter((doctor) =>
//         doctor.consulting.some((schedule) => schedule.day === selectedDay)
//       );
//     }

//     if (selectedTime) {
//       filtered = filtered.filter((doctor) =>
//         doctor.consulting.some((schedule) =>
//           schedule.time.includes(selectedTime)
//         )
//       );
//     }

//     setFilteredDoctors(filtered);
//   };

//   const handleAddDoctor = (newDoctor: Doctor) => {
//     const updatedDoctors = [
//       ...doctors,
//       { ...newDoctor, id: doctors.length + 1 },
//     ];
//     setDoctors(updatedDoctors);
//     setFilteredDoctors(updatedDoctors);
//     setIsFormOpen(false);
//   };

//   const handleUpdateDoctor = (updatedDoctor: Doctor) => {
//     const updatedDoctors = doctors.map((doctor) =>
//       doctor.id === updatedDoctor.id ? updatedDoctor : doctor
//     );
//     setDoctors(updatedDoctors);
//     setFilteredDoctors(updatedDoctors);
//     setIsFormOpen(false);
//     setEditingDoctor(null);
//   };

//   const handleDeleteDoctor = (id: number) => {
//     const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
//     setDoctors(updatedDoctors);
//     setFilteredDoctors(updatedDoctors);
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
//     </div>
//   );
// };

// interface DoctorListProps {
//   doctors: Doctor[];
//   onEdit: (doctor: Doctor) => void;
//   onDelete: (id: number) => void;
// }

// const DoctorList: React.FC<DoctorListProps> = ({
//   doctors,
//   onEdit,
//   onDelete,
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
//               <li key={index} className="text-green-600">
//                 {schedule.day}: {schedule.time}
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => onEdit(doctor)}
//               className="text-blue-600 hover:text-blue-800"
//             >
//               <Edit size={20} />
//             </button>
//             <button
//               onClick={() => {
//                 if (
//                   window.confirm("Are you sure you want to delete this doctor?")
//                 ) {
//                   onDelete(doctor.id);
//                 }
//               }}
//               className="text-red-600 hover:text-red-800"
//             >
//               <Trash2 size={20} />
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
//   const [name, setName] = useState(doctor?.name || "");
//   const [specialty, setSpecialty] = useState(doctor?.specialty || "");
//   const [consulting, setConsulting] = useState<ConsultingSchedule[]>(
//     doctor?.consulting || []
//   );

//   const handleSave = () => {
//     if (name && specialty && consulting.length > 0) {
//       const updatedDoctor: Doctor = {
//         id: doctor ? doctor.id : Date.now(),
//         name,
//         specialty,
//         consulting,
//       };
//       onSave(updatedDoctor);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
//         <h2 className="text-2xl font-bold text-green-800 mb-4">
//           {doctor ? "Edit Doctor" : "Add Doctor"}
//         </h2>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Specialty
//           </label>
//           <select
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
//             value={specialty}
//             onChange={(e) => setSpecialty(e.target.value)}
//           >
//             <option value="">Select Specialty</option>
//             {specialties.map((specialty) => (
//               <option key={specialty} value={specialty}>
//                 {specialty}
//               </option>
//             ))}
//           </select>
//         </div>

//         <h3 className="text-lg font-semibold text-green-700 mb-2">
//           Consulting Hours:
//         </h3>
//         {consulting.map((schedule, index) => (
//           <div key={index} className="flex items-center space-x-4 mb-2">
//             <input
//               type="text"
//               placeholder="Day"
//               className="w-1/2 border border-gray-300 rounded-md"
//               value={schedule.day}
//               onChange={(e) => {
//                 const newConsulting = [...consulting];
//                 newConsulting[index].day = e.target.value;
//                 setConsulting(newConsulting);
//               }}
//             />
//             <input
//               type="text"
//               placeholder="Time"
//               className="w-1/2 border border-gray-300 rounded-md"
//               value={schedule.time}
//               onChange={(e) => {
//                 const newConsulting = [...consulting];
//                 newConsulting[index].time = e.target.value;
//                 setConsulting(newConsulting);
//               }}
//             />
//             <button
//               onClick={() => {
//                 const newConsulting = consulting.filter((_, i) => i !== index);
//                 setConsulting(newConsulting);
//               }}
//               className="text-red-600 hover:text-red-800"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         ))}
//         <button
//           onClick={() => setConsulting([...consulting, { day: "", time: "" }])}
//           className="text-green-600 hover:text-green-800"
//         >
//           <Plus size={20} className="inline" /> Add Consulting Hour
//         </button>

//         <div className="mt-6 flex justify-end space-x-4">
//           <button
//             onClick={onCancel}
//             className="text-gray-600 hover:text-gray-800"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
//           >
//             {doctor ? "Update" : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorManagement;




import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { BackButton } from "../Components/Commen";
import { useNavigate } from "react-router-dom";

interface ConsultingSchedule {
  day: string;
  time: string;
  isBookingDisabled: boolean;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  consulting: ConsultingSchedule[];
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Cardiology",
    consulting: [
      { day: "Monday", time: "09:00 AM - 01:00 PM", isBookingDisabled: false },
      {
        day: "Wednesday",
        time: "02:00 PM - 06:00 PM",
        isBookingDisabled: false,
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Pediatrics",
    consulting: [
      { day: "Tuesday", time: "10:00 AM - 02:00 PM", isBookingDisabled: false },
      {
        day: "Thursday",
        time: "01:00 PM - 05:00 PM",
        isBookingDisabled: false,
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Mike Johnson",
    specialty: "Orthopedics",
    consulting: [
      { day: "Monday", time: "02:00 PM - 06:00 PM", isBookingDisabled: false },
      { day: "Friday", time: "09:00 AM - 01:00 PM", isBookingDisabled: false },
    ],
  },
];

const mockSpecialties = [
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Dermatology",
];

const DoctorManagement: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, selectedSpecialty, selectedDay, selectedTime]);

  const filterDoctors = () => {
    let filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedSpecialty) {
      filtered = filtered.filter(
        (doctor) => doctor.specialty === selectedSpecialty
      );
    }

    if (selectedDay) {
      filtered = filtered.filter((doctor) =>
        doctor.consulting.some((schedule) => schedule.day === selectedDay)
      );
    }

    if (selectedTime) {
      filtered = filtered.filter((doctor) =>
        doctor.consulting.some((schedule) =>
          schedule.time.includes(selectedTime)
        )
      );
    }

    setFilteredDoctors(filtered);
  };

  const handleAddDoctor = (newDoctor: Doctor) => {
    const updatedDoctors = [
      ...doctors,
      { ...newDoctor, id: doctors.length + 1 },
    ];
    setDoctors(updatedDoctors);
    setFilteredDoctors(updatedDoctors);
    setIsFormOpen(false);
  };

  const handleUpdateDoctor = (updatedDoctor: Doctor) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === updatedDoctor.id ? updatedDoctor : doctor
    );
    setDoctors(updatedDoctors);
    setFilteredDoctors(updatedDoctors);
    setIsFormOpen(false);
    setEditingDoctor(null);
  };

  const handleDeleteDoctor = (id: number) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(updatedDoctors);
    setFilteredDoctors(updatedDoctors);
  };

  const handleToggleBooking = (doctorId: number, scheduleIndex: number) => {
    const updatedDoctors = doctors.map((doctor) => {
      if (doctor.id === doctorId) {
        const updatedConsulting = [...doctor.consulting];
        updatedConsulting[scheduleIndex] = {
          ...updatedConsulting[scheduleIndex],
          isBookingDisabled:
            !updatedConsulting[scheduleIndex].isBookingDisabled,
        };
        return { ...doctor, consulting: updatedConsulting };
      }
      return doctor;
    });
    setDoctors(updatedDoctors);
    setFilteredDoctors(updatedDoctors);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-6 flex items-center justify-center">
        <BackButton OnClick={() => navigate("/Dashboard")} />
        <h1 className="text-3xl font-bold text-green-800">
          Doctors Management
        </h1>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
            size={20}
          />
        </div>
        <select
          className="border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          {mockSpecialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
        <select
          className="border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="">All Days</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
        <select
          className="border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">All Times</option>
          <option value="AM">Morning</option>
          <option value="PM">Afternoon</option>
        </select>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={20} className="inline mr-2" />
          Add Doctor
        </button>
      </div>

      <DoctorList
        doctors={filteredDoctors}
        onEdit={setEditingDoctor}
        onDelete={handleDeleteDoctor}
        onToggleBooking={handleToggleBooking}
      />

      {(isFormOpen || editingDoctor) && (
        <DoctorForm
          doctor={editingDoctor}
          onSave={editingDoctor ? handleUpdateDoctor : handleAddDoctor}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingDoctor(null);
          }}
          specialties={mockSpecialties}
        />
      )}
    </div>
  );
};

interface DoctorListProps {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
  onToggleBooking: (doctorId: number, scheduleIndex: number) => void;
}

const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  onEdit,
  onDelete,
  onToggleBooking,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            {doctor.name}
          </h2>
          <p className="text-green-600 mb-4">{doctor.specialty}</p>
          <h3 className="font-semibold text-green-700 mb-2">
            Consulting Hours:
          </h3>
          <ul className="space-y-1 mb-4">
            {doctor.consulting.map((schedule, index) => (
              <li
                key={index}
                className="text-green-600 flex items-center justify-between"
              >
                <span>
                  {schedule.day}: {schedule.time}
                </span>
                <button
                  onClick={() => onToggleBooking(doctor.id, index)}
                  className={`ml-2 ${
                    schedule.isBookingDisabled
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {schedule.isBookingDisabled ? (
                    <ToggleLeft size={20} />
                  ) : (
                    <ToggleRight size={20} />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => onEdit(doctor)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this doctor?")
                ) {
                  onDelete(doctor.id);
                }
              }}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

interface DoctorFormProps {
  doctor?: Doctor | null;
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
  const [name, setName] = useState(doctor?.name || "");
  const [specialty, setSpecialty] = useState(doctor?.specialty || "");
  const [consulting, setConsulting] = useState<ConsultingSchedule[]>(
    doctor?.consulting || []
  );

  const handleSave = () => {
    if (name && specialty && consulting.length > 0) {
      const updatedDoctor: Doctor = {
        id: doctor ? doctor.id : Date.now(),
        name,
        specialty,
        consulting,
      };
      onSave(updatedDoctor);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          {doctor ? "Edit Doctor" : "Add Doctor"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Specialty
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          >
            <option value="">Select Specialty</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <h3 className="text-lg font-semibold text-green-700 mb-2">
          Consulting Hours:
        </h3>
        {consulting.map((schedule, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <input
              type="text"
              placeholder="Day"
              className="w-1/3 border border-gray-300 rounded-md"
              value={schedule.day}
              onChange={(e) => {
                const newConsulting = [...consulting];
                newConsulting[index].day = e.target.value;
                setConsulting(newConsulting);
              }}
            />
            <input
              type="text"
              placeholder="Time"
              className="w-1/3 border border-gray-300 rounded-md"
              value={schedule.time}
              onChange={(e) => {
                const newConsulting = [...consulting];
                newConsulting[index].time = e.target.value;
                setConsulting(newConsulting);
              }}
            />
            <button
              onClick={() => {
                const newConsulting = consulting.filter((_, i) => i !== index);
                setConsulting(newConsulting);
              }}
              className="text-red-600 hover:text-red-800"
            >
              <X size={20} />
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setConsulting([
              ...consulting,
              { day: "", time: "", isBookingDisabled: false },
            ])
          }
          className="text-green-600 hover:text-green-800"
        >
          <Plus size={20} className="inline" /> Add Consulting Hour
        </button>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            {doctor ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorManagement;