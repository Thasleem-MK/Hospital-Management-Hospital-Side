import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Bell,
} from "lucide-react";

// Types
interface Appointment {
  id: string;
  customerName: string;
  specialtyName: string;
  doctorName: string;
  dateTime: string;
  status: "pending" | "accepted" | "declined";
}

// Mock data (replace with actual API calls in a real application)
const mockAppointments: Appointment[] = [
  {
    id: "1",
    customerName: "John Doe",
    specialtyName: "Cardiology",
    doctorName: "Dr. Smith",
    dateTime: "2024-10-15T10:00:00",
    status: "pending",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    specialtyName: "Pediatrics",
    doctorName: "Dr. Johnson",
    dateTime: "2024-10-15T11:30:00",
    status: "pending",
  },
  {
    id: "3",
    customerName: "Bob Brown",
    specialtyName: "Orthopedics",
    doctorName: "Dr. Williams",
    dateTime: "2024-10-16T09:15:00",
    status: "accepted",
  },
  {
    id: "4",
    customerName: "Alice Green",
    specialtyName: "Dermatology",
    doctorName: "Dr. Davis",
    dateTime: "2024-10-16T14:00:00",
    status: "declined",
  },
];

const AppointmentsManagement: React.FC = () => {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [filteredAppointments, setFilteredAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "accepted" | "declined"
  >("all");
  const [newAppointment, setNewAppointment] = useState<Appointment | null>(
    null
  );

  const appointmentsPerPage = 5;

//   useEffect(() => {
//     // Simulating new appointment notifications
//     const interval = setInterval(() => {
//       const randomAppointment: Appointment = {
//         id: `${Date.now()}`,
//         customerName: `Customer ${Math.floor(Math.random() * 100)}`,
//         specialtyName: [
//           "Cardiology",
//           "Pediatrics",
//           "Orthopedics",
//           "Dermatology",
//         ][Math.floor(Math.random() * 4)],
//         doctorName: `Dr. ${
//           ["Smith", "Johnson", "Williams", "Davis"][
//             Math.floor(Math.random() * 4)
//           ]
//         }`,
//         dateTime: new Date(
//           Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000
//         ).toISOString(),
//         status: "pending",
//       };
//       setNewAppointment(randomAppointment);
//     }, 30000); // New appointment every 30 seconds

//     return () => clearInterval(interval);
//   }, []);

  const filterAppointments = (
    status: "all" | "pending" | "accepted" | "declined"
  ) => {
    setFilterStatus(status);
    if (status === "all") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter((app) => app.status === status)
      );
    }
    setCurrentPage(1);
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleStatusChange = (
    id: string,
    newStatus: "accepted" | "declined"
  ) => {
    const updatedAppointments = appointments.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setAppointments(updatedAppointments);
    setFilteredAppointments(
      updatedAppointments.filter(
        (app) => app.status === filterStatus || filterStatus === "all"
      )
    );
    setSelectedAppointment(null);
    setNewAppointment(null);
  };

  const handleNewAppointment = (action: "accept" | "decline") => {
    if (newAppointment) {
      const updatedAppointment: Appointment = {
        ...newAppointment,
        status: action === "accept" ? "accepted" : "declined", // Correctly infer the status
      };
      setAppointments([updatedAppointment, ...appointments]);
      setFilteredAppointments([updatedAppointment, ...filteredAppointments]);
      setNewAppointment(null);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Appointments Management
      </h1>

      {newAppointment && (
        <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-md">
          <div className="flex items-center">
            <Bell className="text-yellow-500 mr-2" />
            <p className="text-yellow-700">
              New appointment request from {newAppointment.customerName} for{" "}
              {newAppointment.specialtyName} with {newAppointment.doctorName} on{" "}
              {new Date(newAppointment.dateTime).toLocaleString()}
            </p>
          </div>
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={() => handleNewAppointment("accept")}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => handleNewAppointment("decline")}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => filterAppointments("all")}
          className={`px-4 py-2 rounded-md ${
            filterStatus === "all"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800"
          }`}
        >
          All
        </button>
        <button
          onClick={() => filterAppointments("pending")}
          className={`px-4 py-2 rounded-md ${
            filterStatus === "pending"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => filterAppointments("accepted")}
          className={`px-4 py-2 rounded-md ${
            filterStatus === "accepted"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800"
          }`}
        >
          Accepted
        </button>
        <button
          onClick={() => filterAppointments("declined")}
          className={`px-4 py-2 rounded-md ${
            filterStatus === "declined"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-800"
          }`}
        >
          Declined
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-green-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                Specialty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-green-200">
            {currentAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.specialtyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.doctorName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(appointment.dateTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "declined"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedAppointment(appointment)}
                    className="text-green-600 hover:text-green-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-green-700">
            Showing {indexOfFirstAppointment + 1} to{" "}
            {Math.min(indexOfLastAppointment, filteredAppointments.length)} of{" "}
            {filteredAppointments.length} appointments
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-green-100 text-green-800 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-green-800">Page {currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastAppointment >= filteredAppointments.length}
            className="px-3 py-1 rounded-md bg-green-100 text-green-800 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Appointment Details
            </h2>
            <p>
              <strong>Customer:</strong> {selectedAppointment.customerName}
            </p>
            <p>
              <strong>Specialty:</strong> {selectedAppointment.specialtyName}
            </p>
            <p>
              <strong>Doctor:</strong> {selectedAppointment.doctorName}
            </p>
            <p>
              <strong>Date & Time:</strong>{" "}
              {new Date(selectedAppointment.dateTime).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedAppointment.status.charAt(0).toUpperCase() +
                selectedAppointment.status.slice(1)}
            </p>
            <div className="mt-6 flex justify-end space-x-2">
              {selectedAppointment.status === "pending" && (
                <>
                  <button
                    onClick={() =>
                      handleStatusChange(selectedAppointment.id, "accepted")
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Check size={20} className="inline mr-2" />
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(selectedAppointment.id, "declined")
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    <X size={20} className="inline mr-2" />
                    Decline
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 border border-green-300 text-green-700 rounded-md hover:bg-green-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsManagement;