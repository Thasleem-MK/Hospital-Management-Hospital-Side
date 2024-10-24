import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash2, ChevronRight, X } from "lucide-react";
import { Button } from "../Components/UI/Button";
import { FormInput } from "../Components/Commen";
import { Select } from "../Components/UI/Select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../Components/UI/Card";
import { BackButton } from "../Components/Commen";
import { DeleteConfirmationDialog } from "../Components/DeleteConfirmation";
import { setHospitalData } from "../Redux/Dashboard";
import { RootState } from "../Redux/Store";
import { apiClient } from "../Components/Axios";

interface Doctor {
  _id: string;
  name: string;
  specialty?: string;
  qualification?: string;
  consulting: {
    day: string;
    start_time: string;
    end_time: string;
  }[];
}

const DoctorManagement: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { specialties, _id } = useSelector(
    (state: RootState) => state.Dashboard
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<{
    specialtyName: string;
    doctorId: string;
  } | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState<Doctor>({
    _id: "",
    name: "",
    specialty: "",
    qualification: "",
    consulting: [{ day: "", start_time: "", end_time: "" }],
  });

  const filteredSpecialties = specialties.filter((specialty) => {
    return (
      (searchTerm === "" ||
        specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialty.doctors.some((doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
        )) &&
      (selectedSpecialty === "" ||
        specialty.name.toLowerCase() === selectedSpecialty.toLowerCase()) &&
      (selectedDay === "" ||
        specialty.doctors.some((doctor) =>
          doctor.consulting.some(
            (consulting) =>
              consulting.day.toLowerCase() === selectedDay.toLowerCase()
          )
        ))
    );
  });

  const handleDeleteDoctor = (specialtyName: string, doctorId: string) => {
    setDoctorToDelete({ specialtyName, doctorId });
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteDoctor = async () => {
    if (doctorToDelete) {
      await apiClient
        .delete(
          `/api/hospital/doctor/${_id}/${doctorToDelete.doctorId}?specialty_name=${doctorToDelete.specialtyName}`,
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          dispatch(setHospitalData({ specialties: result.data.data }));
          setShowDeleteConfirmation(false);
          setDoctorToDelete(null);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAddDoctor = async () => {
    setEditingDoctor(null);
    setFormData({
      _id: "",
      name: "",
      qualification: "",
      specialty: "",
      consulting: [{ day: "", start_time: "", end_time: "" }],
    });
    setIsFormOpen(true);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData(doctor);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      await apiClient
        .put(
          `/api/hospital/doctor/${_id}`,
          {
            name: formData.name,
            specialty: formData.specialty,
            consulting: formData.consulting,
            _id: formData._id,
          },
          { withCredentials: true }
        )
        .then((result) => {
          dispatch(setHospitalData({ specialties: result.data.data }));
          setIsFormOpen(false);
        })
        .catch((err) => console.log(err));
    } else {
      await apiClient
        .post(
          `/api/hospital/doctor/${_id}`,
          {
            name: formData.name,
            specialty: formData.specialty,
            consulting: formData.consulting,
          },
          { withCredentials: true }
        )
        .then((result) => {
          dispatch(setHospitalData({ specialties: result.data.data }));
          setIsFormOpen(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConsultingChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newConsulting = [...formData.consulting];
    newConsulting[index] = { ...newConsulting[index], [field]: value };
    setFormData((prev) => ({ ...prev, consulting: newConsulting }));
  };

  const addConsultingSlot = () => {
    setFormData((prev) => ({
      ...prev,
      consulting: [
        ...prev.consulting,
        { day: "", start_time: "", end_time: "" },
      ],
    }));
  };

  const removeConsultingSlot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      consulting: prev.consulting.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="relative mb-6 flex items-center justify-center">
        <BackButton OnClick={() => navigate("/Dashboard")} />
        <h1 className="text-3xl font-bold text-green-800">
          Doctors Management
        </h1>
      </div>

      <div className="mb-6">
        <div className="relative flex-grow mb-4">
          <FormInput
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
            size={20}
          />
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="flex-grow border border-green-300 text-green-600"
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty._id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </Select>
          <Select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="flex-grow border border-green-300 text-green-600"
          >
            <option value="">All Days</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </Select>
          <Button
            onClick={handleAddDoctor}
            className="border border-green-300 text-green-600 hover:bg-green-100"
          >
            <Plus size={20} className="mr-2" />
            Add Doctor
          </Button>
        </div>
      </div>

      {filteredSpecialties.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">
          No doctors found. Please adjust your search criteria or add a new
          doctor.
        </div>
      ) : (
        filteredSpecialties.map((specialty) => (
          <Card key={specialty._id} className="mb-6 bg-white border-green-300">
            <CardHeader className="bg-green-100 mb-4">
              <CardTitle className="text-green-800">{specialty.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {specialty.doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="mb-4 p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-green-800">
                      {doctor.name}
                    </h3>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2 text-green-600 border-green-600 hover:bg-green-100"
                        onClick={() => handleEditDoctor(doctor)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-100"
                        onClick={() =>
                          handleDeleteDoctor(specialty.name, doctor._id)
                        }
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-semibold text-green-700 mb-2">
                    Consulting Hours:
                  </h4>
                  <ul className="space-y-1">
                    {doctor.consulting.map((schedule, index) => (
                      <li key={index} className="text-green-600">
                        {schedule.day}:{" "}
                        {convertTo12HourFormat(schedule.start_time)} -{" "}
                        {convertTo12HourFormat(schedule.end_time)}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="link"
                    className="mt-2 text-green-600 hover:text-green-800"
                    onClick={() => navigate(`/doctor/${doctor._id}`)}
                  >
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmationDialog
          onConfirm={confirmDeleteDoctor}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded">
            <div className="px-3 bg-white rounded-lg w-full max-w-md max-h-[calc(100vh-7rem)] overflow-y-auto m-5">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <FormInput
                  type="text"
                  name="name"
                  placeholder="Doctor Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mb-4"
                />
                <FormInput
                  type="text"
                  name="qualification"
                  placeholder="Doctor Qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="mb-4"
                />
                <Select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className="mb-4"
                  required
                >
                  <option value="">Select Specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty._id} value={specialty.name}>
                      {specialty.name}
                    </option>
                  ))}
                </Select>
                <h3 className="font-semibold text-green-700 mb-2">
                  Consulting Hours:
                </h3>
                {formData.consulting.map((slot, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border border-green-200 rounded-lg"
                  >
                    <Select
                      value={slot.day}
                      onChange={(e) =>
                        handleConsultingChange(index, "day", e.target.value)
                      }
                      className="mb-2"
                      required
                    >
                      <option value="">Select Day</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </Select>
                    <FormInput
                      type="time"
                      value={slot.start_time}
                      onChange={(e: any) =>
                        handleConsultingChange(
                          index,
                          "start_time",
                          e.target.value
                        )
                      }
                      className="mb-2"
                    />
                    <FormInput
                      type="time"
                      value={slot.end_time}
                      onChange={(e: any) =>
                        handleConsultingChange(
                          index,
                          "end_time",
                          e.target.value
                        )
                      }
                      className="mb-2"
                    />
                    <Button
                      type="button"
                      onClick={() => removeConsultingSlot(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X size={16} className="mr-1" />
                      Remove Slot
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addConsultingSlot}
                  className="mb-4 text-green-600 hover:text-green-800"
                >
                  <Plus size={16} className="mr-1" />
                  Add Consulting Slot
                </Button>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    {editingDoctor ? "Update Doctor" : "Add Doctor"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;

export const convertTo12HourFormat = (time: string) => {
  const [hours, minutes] = time.split(":");
  let period = "AM";
  let hour = parseInt(hours, 10);

  if (hour >= 12) {
    period = "PM";
    if (hour > 12) hour -= 12;
  }
  if (hour === 0) hour = 12;

  return `${hour}:${minutes} ${period}`;
};
