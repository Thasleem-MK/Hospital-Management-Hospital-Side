import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, X, Clock } from "lucide-react";
import { DeleteConfirmationDialog } from "../Components/DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../Components/Commen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { Doctor, setHospitalData, Specialty } from "../Redux/Dashboard";
import { fetchData } from "../Components/FetchData";
import { apiClient } from "../Components/Axios";
import { errorToast, successToast } from "../Components/Toastify";

const SpecialtyManagement: React.FC = () => {
  const { specialties, _id } = useSelector(
    (state: RootState) => state.Dashboard
  );
  const [filteredSpecialties, setFilteredSpecialties] =
    useState<Specialty[]>(specialties);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(
    null
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch, setHospitalData);
  }, []);

  useEffect(() => {
    filterSpecialties();
  }, [searchTerm, specialties]);

  const filterSpecialties = () => {
    const filtered = specialties.filter(
      (specialty) =>
        specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialty?.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSpecialties(filtered);
  };

  // Add a new specialty.
  const handleAddSpecialty = async (newSpecialty: Omit<Specialty, "id">) => {
    await apiClient
      .post(
        `/api//hospital/specialty/${_id}`,
        { ...newSpecialty },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result.data.data);
        dispatch(setHospitalData({ specialties: result.data.data }));
        setIsFormOpen(false);
        successToast("Added new specialty");
      })
      .catch((err) => errorToast(err.response.data.message));
  };

  // Edit a specialty.
  const handleUpdateSpecialty = async (updatedSpecialty: Specialty) => {
    await apiClient
      .put(
        `/api/hospital/specialty/${_id}`,
        { ...updatedSpecialty },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result.data.data);
        dispatch(setHospitalData({ specialties: result.data.data }));
        setIsFormOpen(false);
        setEditingSpecialty(null);
        successToast("Added new specialty");
      })
      .catch((err) => errorToast(err.response.data.message));
  };

  const handleDeleteSpecialty = async (name: string) => {
    await apiClient
      .delete(`/api/hospital/specialty/${_id}?name=${name}`, {
        withCredentials: true,
      })
      .then((result) => {
        dispatch(setHospitalData({ specialties: result.data.data }));
      })
      .catch((err) => errorToast(err.response.data.message));
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <BackButton OnClick={() => navigate("/dashboard")} />
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
        <div key={specialty._id} className="bg-white p-6 rounded-lg shadow-md">
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
              <li key={doctor._id} className="text-green-600">
                {doctor.name}
                <ul className="ml-4 text-sm">
                  {doctor.consulting.map((schedule, index) => (
                    <li key={index}>
                      {schedule.day}: {schedule.start_time} -{" "}
                      {schedule.end_time}
                    </li>
                  ))}
                </ul>
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
                setSelectedSpecialty(specialty.name);
              }}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
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
  );
};

const SpecialtyForm: React.FC<{
  specialty: Specialty | null;
  onSave: (specialty: Specialty) => void;
  onCancel: () => void;
}> = ({ specialty, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Specialty>(
    specialty || {
      _id: "",
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
      { _id: String(doctors.length + 1), name: "", consulting: [] },
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
          key={doctor._id}
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
                  newConsulting[scheduleIndex] = {
                    ...newConsulting[scheduleIndex],
                    day: e.target.value,
                  };
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
              <div className="flex items-center space-x-2">
                <Clock size={20} className="text-green-600" />
                <input
                  type="time"
                  value={schedule.start_time}
                  onChange={(e) => {
                    const newConsulting = [...doctor.consulting];
                    newConsulting[scheduleIndex] = {
                      ...newConsulting[scheduleIndex],
                      start_time: e.target.value,
                    };
                    updateDoctor(index, {
                      ...doctor,
                      consulting: newConsulting,
                    });
                  }}
                  className="border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <span>-</span>
                <input
                  type="time"
                  value={schedule.end_time}
                  onChange={(e) => {
                    const newConsulting = [...doctor.consulting];
                    newConsulting[scheduleIndex] = {
                      ...newConsulting[scheduleIndex],
                      end_time: e.target.value,
                    };
                    updateDoctor(index, {
                      ...doctor,
                      consulting: newConsulting,
                    });
                  }}
                  className="border border-green-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
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
                { day: "", start_time: "", end_time: "" },
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
