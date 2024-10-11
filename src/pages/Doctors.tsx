import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { BackButton } from "../Components/Commen";
import { useNavigate } from "react-router-dom";

// Types
interface ConsultingSlot {
  day: string;
  time: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  consulting: ConsultingSlot[];
}

// Mock data for doctors (replace with actual API calls in a real application)
const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Cardiology",
    consulting: [
      { day: "Monday", time: "09:00 AM - 01:00 PM" },
      { day: "Wednesday", time: "02:00 PM - 06:00 PM" },
    ],
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    specialty: "Pediatrics",
    consulting: [
      { day: "Tuesday", time: "10:00 AM - 02:00 PM" },
      { day: "Thursday", time: "01:00 PM - 05:00 PM" },
    ],
  },
  {
    id: 3,
    name: "Dr. Mike Johnson",
    specialty: "Orthopedics",
    consulting: [
      { day: "Monday", time: "02:00 PM - 06:00 PM" },
      { day: "Friday", time: "09:00 AM - 01:00 PM" },
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
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

  const handleAddDoctor = (newDoctor: Omit<Doctor, "id">) => {
    const updatedDoctors = [
      ...doctors,
      { ...newDoctor, id: doctors.length + 1 }, // Assign new id to the new doctor
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

  const handleSaveDoctor = (doctor: Doctor | Omit<Doctor, "id">) => {
    if ("id" in doctor) {
      // This is an existing doctor (has an id), update it
      handleUpdateDoctor(doctor as Doctor);
    } else {
      // This is a new doctor (doesn't have an id), add it
      handleAddDoctor(doctor as Omit<Doctor, "id">);
    }
  };

  const handleDeleteDoctor = (id: number) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(updatedDoctors);
    setFilteredDoctors(updatedDoctors);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-6 flex items-center justify-center">
        <BackButton OnClick={() => navigate("/Dashboard")} />
        <h1 className="text-3xl font-bold text-green-800">Doctor Management</h1>
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
      />

      {(isFormOpen || editingDoctor) && (
        <DoctorForm
          doctor={editingDoctor}
          onSave={handleSaveDoctor}
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

const DoctorList: React.FC<{
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
}> = ({ doctors, onEdit, onDelete }) => {
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
              <li key={index} className="text-green-600">
                {schedule.day}: {schedule.time}
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
              onClick={() => onDelete(doctor.id)}
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

const DoctorForm: React.FC<{
  doctor: Doctor | null;
  onSave: (doctor: Doctor | Omit<Doctor, "id">) => void;
  onCancel: () => void;
  specialties: string[];
}> = ({ doctor, onSave, onCancel, specialties }) => {
  const [formData, setFormData] = useState<Omit<Doctor, "id">>(
    doctor || { name: "", specialty: "", consulting: [{ day: "", time: "" }] }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConsultingChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedConsulting = [...formData.consulting];
    updatedConsulting[index] = { ...updatedConsulting[index], [field]: value };
    setFormData({ ...formData, consulting: updatedConsulting });
  };

  const handleAddConsulting = () => {
    setFormData({
      ...formData,
      consulting: [...formData.consulting, { day: "", time: "" }],
    });
  };

  const handleRemoveConsulting = (index: number) => {
    const updatedConsulting = formData.consulting.filter((_, i) => i !== index);
    setFormData({ ...formData, consulting: updatedConsulting });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">
          {doctor ? "Edit Doctor" : "Add Doctor"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              Doctor's Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="specialty"
            >
              Specialty
            </label>
            <select
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Specialty</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          {formData.consulting.map((schedule, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consulting {index + 1}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={schedule.day}
                  onChange={(e) =>
                    handleConsultingChange(index, "day", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
                <input
                  type="text"
                  placeholder="Time"
                  value={schedule.time}
                  onChange={(e) =>
                    handleConsultingChange(index, "time", e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="text-red-500 text-sm mt-2"
                  onClick={() => handleRemoveConsulting(index)}
                >
                  Remove Consulting Slot
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddConsulting}
            className="text-blue-600 text-sm mb-4"
          >
            + Add Consulting Slot
          </button>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              {doctor ? "Update Doctor" : "Add Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorManagement;
