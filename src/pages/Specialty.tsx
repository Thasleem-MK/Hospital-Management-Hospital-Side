import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, X, ArrowLeft } from "lucide-react";
import { DeleteConfirmationDialog } from "../Components/DeleteConfirmation";
import { useNavigate } from "react-router-dom";

// Types based on your MongoDB schema
interface Doctor {
  id: string;
  name: string;
  consulting: {
    day: string;
    time: string;
  }[];
}

interface Specialty {
  id: string;
  name: string;
  description: string;
  department_info: string;
  phone: string;
  doctors: Doctor[];
}

// Mock data for specialties (replace with actual API calls in a real application)
const mockSpecialties: Specialty[] = [
  {
    id: "1",
    name: "Cardiology",
    description: "Deals with disorders of the heart and blood vessels",
    department_info: "Located in Building A, 3rd Floor",
    phone: "123-456-7890", // Add this line
    doctors: [
      {
        id: "1",
        name: "Dr. John Doe",
        consulting: [
          { day: "Monday", time: "09:00 AM - 01:00 PM" },
          { day: "Wednesday", time: "02:00 PM - 06:00 PM" },
        ],
      },
      {
        id: "2",
        name: "Dr. Jane Smith",
        consulting: [
          { day: "Tuesday", time: "10:00 AM - 02:00 PM" },
          { day: "Thursday", time: "01:00 PM - 05:00 PM" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Pediatrics",
    description: "Provides medical care for infants, children, and adolescents",
    department_info: "Located in Building B, 2nd Floor",
    phone: "098-765-4321", // Add this line
    doctors: [
      {
        id: "3",
        name: "Dr. Mike Johnson",
        consulting: [
          { day: "Monday", time: "02:00 PM - 06:00 PM" },
          { day: "Friday", time: "09:00 AM - 01:00 PM" },
        ],
      },
    ],
  },
];

const BackButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="mr-4 p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors absolute left-4 top-4"
    >
      <ArrowLeft className="h-6 w-6" />
    </button>
  );
};

const SpecialtyManagement: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>(mockSpecialties);
  const [filteredSpecialties, setFilteredSpecialties] =
    useState<Specialty[]>(mockSpecialties);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    filterSpecialties();
  }, [searchTerm]);

  const filterSpecialties = () => {
    const filtered = specialties.filter(
      (specialty) =>
        specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialty.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSpecialties(filtered);
  };

  const handleAddSpecialty = (newSpecialty: Omit<Specialty, "id">) => {
    const updatedSpecialties = [
      ...specialties,
      { ...newSpecialty, id: String(specialties.length + 1) },
    ];
    setSpecialties(updatedSpecialties);
    setFilteredSpecialties(updatedSpecialties);
    setIsFormOpen(false);
  };

  const handleUpdateSpecialty = (updatedSpecialty: Specialty) => {
    const updatedSpecialties = specialties.map((specialty) =>
      specialty.id === updatedSpecialty.id ? updatedSpecialty : specialty
    );
    setSpecialties(updatedSpecialties);
    setFilteredSpecialties(updatedSpecialties);
    setIsFormOpen(false);
    setEditingSpecialty(null);
  };

  const handleDeleteSpecialty = (id: string) => {
    const updatedSpecialties = specialties.filter(
      (specialty) => specialty.id !== id
    );
    setSpecialties(updatedSpecialties);
    setFilteredSpecialties(updatedSpecialties);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <BackButton onClick={()=>{navigate("/dashboard")}} />
      <h1 className="text-3xl font-bold text-green-800 mb-6 mt-12">
        Specialty Management
      </h1>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search specialties..."
            className="w-full pl-10 pr-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
            size={20}
          />
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus size={20} className="inline mr-2" />
          Add Specialty
        </button>
      </div>

      <SpecialtyList
        specialties={filteredSpecialties}
        onEdit={setEditingSpecialty}
        onDelete={handleDeleteSpecialty}
      />

      {(isFormOpen || editingSpecialty) && (
        <SpecialtyForm
          specialty={editingSpecialty}
          onSave={editingSpecialty ? handleUpdateSpecialty : handleAddSpecialty}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingSpecialty(null);
          }}
        />
      )}
    </div>
  );
};

const SpecialtyList: React.FC<{
  specialties: Specialty[];
  onEdit: (specialty: Specialty) => void;
  onDelete: (id: string) => void;
}> = ({ specialties, onEdit, onDelete }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {specialties.map((specialty) => (
        <div key={specialty.id} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            {specialty.name}
          </h2>
          <p className="text-green-600 mb-4">{specialty.description}</p>
          <p className="text-sm text-green-700 mb-2">
            {specialty.department_info}
          </p>
          <p className="text-sm text-green-700 mb-4">
            Phone: {specialty.phone}
          </p>
          <h3 className="font-semibold text-green-700 mb-2">Doctors:</h3>
          <ul className="space-y-1 mb-4">
            {specialty.doctors.map((doctor) => (
              <li key={doctor.id} className="text-green-600">
                {doctor.name}
              </li>
            ))}
          </ul>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => onEdit(specialty)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => {
                setIsDeleteOpen(true);
                setSelectedSpecialty(specialty.id);
              }}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
            {isDeleteOpen && (
              <DeleteConfirmationDialog
                onCancel={() => {
                  setIsDeleteOpen(false);
                  setSelectedSpecialty("");
                }}
                onConfirm={() => {
                  onDelete(selectedSpecialty);
                  setIsDeleteOpen(false);
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const SpecialtyForm: React.FC<{
  specialty: Specialty | null;
  onSave: (specialty: Specialty) => void;
  onCancel: () => void;
}> = ({ specialty, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Specialty>(
    specialty || {
      id: "",
      name: "",
      description: "",
      department_info: "",
      phone: "",
      doctors: [],
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          {specialty ? "Edit Specialty" : "Add New Specialty"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-green-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-green-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="department_info"
              className="block text-sm font-medium text-green-700"
            >
              Department Info
            </label>
            <input
              type="text"
              id="department_info"
              name="department_info"
              value={formData.department_info}
              onChange={handleChange}
              className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-green-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <DoctorSchedule
            doctors={formData.doctors}
            onUpdate={(updatedDoctors) =>
              setFormData((prevData) => ({
                ...prevData,
                doctors: updatedDoctors,
              }))
            }
          />
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-green-300 text-green-700 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {specialty ? "Update" : "Add"} Specialty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DoctorSchedule: React.FC<{
  doctors: Doctor[];
  onUpdate: (updatedDoctors: Doctor[]) => void;
}> = ({ doctors, onUpdate }) => {
  const addDoctor = () => {
    onUpdate([
      ...doctors,
      { id: String(doctors.length + 1), name: "", consulting: [] },
    ]);
  };

  const updateDoctor = (index: number, updatedDoctor: Doctor) => {
    const newDoctors = [...doctors];
    newDoctors[index] = updatedDoctor;
    onUpdate(newDoctors);
  };

  const removeDoctor = (index: number) => {
    const newDoctors = doctors.filter((_, i) => i !== index);
    onUpdate(newDoctors);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-green-800 mb-2">Doctors</h3>
      {doctors.map((doctor, index) => (
        <div
          key={doctor.id}
          className="mb-4 p-4 border border-green-200 rounded-md"
        >
          <input
            type="text"
            value={doctor.name}
            onChange={(e) =>
              updateDoctor(index, { ...doctor, name: e.target.value })
            }
            placeholder="Doctor's name"
            className="mb-2 w-full border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
          {doctor.consulting.map((schedule, scheduleIndex) => (
            <div
              key={scheduleIndex}
              className="flex items-center space-x-2 mb-2"
            >
              <select
                value={schedule.day}
                onChange={(e) => {
                  const newConsulting = [...doctor.consulting];
                  newConsulting[scheduleIndex].day = e.target.value;
                  updateDoctor(index, { ...doctor, consulting: newConsulting });
                }}
                className="border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select day</option>
                <option value="Monday">Monday</option>

                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              <input
                type="text"
                value={schedule.time}
                onChange={(e) => {
                  const newConsulting = [...doctor.consulting];
                  newConsulting[scheduleIndex].time = e.target.value;
                  updateDoctor(index, { ...doctor, consulting: newConsulting });
                }}
                placeholder="e.g., 09:00 AM - 01:00 PM"
                className="flex-grow border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => {
                  const newConsulting = doctor.consulting.filter(
                    (_, i) => i !== scheduleIndex
                  );
                  updateDoctor(index, { ...doctor, consulting: newConsulting });
                }}
                className="text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const newConsulting = [
                ...doctor.consulting,
                { day: "", time: "" },
              ];
              updateDoctor(index, { ...doctor, consulting: newConsulting });
            }}
            className="mt-2 text-green-600 hover:text-green-800"
          >
            + Add Consulting Slot
          </button>
          <button
            type="button"
            onClick={() => removeDoctor(index)}
            className="mt-2 ml-2 text-red-600 hover:text-red-800"
          >
            Remove Doctor
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addDoctor}
        className="mt-2 text-green-600 hover:text-green-800"
      >
        + Add Doctor
      </button>
    </div>
  );
};

export default SpecialtyManagement;
