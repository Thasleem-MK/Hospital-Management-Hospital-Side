import React, { useState, useEffect } from "react";
import {
  Hospital,
  Phone,
  MapPin,
  Clock,
  Camera,
  AlertCircle,
} from "lucide-react";
import { BackButton, FormInput } from "../Components/Commen";
import { apiClient } from "../Components/Axios";
import { errorToast, successToast } from "../Components/Toastify";
import { useNavigate } from "react-router-dom";

interface WorkingHours {
  [key: string]: { open: string; close: string };
}

interface HospitalProfile {
  name: string;
  email: string;
  mobile: string;
  address: string;
  latitude: string;
  longitude: string;
  workingHours: WorkingHours;
  profilePhoto: string;
  emergencyContact: string;
}

const HospitalProfile: React.FC = () => {
  const [profile, setProfile] = useState<HospitalProfile>({
    name: "",
    email: "",
    mobile: "",
    address: "",
    latitude: "",
    longitude: "",
    workingHours: {
      Monday: { open: "", close: "" },
      Tuesday: { open: "", close: "" },
      Wednesday: { open: "", close: "" },
      Thursday: { open: "", close: "" },
      Friday: { open: "", close: "" },
      Saturday: { open: "", close: "" },
      Sunday: { open: "", close: "" },
    },
    profilePhoto: "",
    emergencyContact: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get("/api/hospital/profile");
      setProfile(response.data);
    } catch (error) {
      errorToast("Failed to fetch profile data");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleWorkingHoursChange = (
    day: string,
    type: "open" | "close",
    value: string
  ) => {
    setProfile((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: { ...prev.workingHours[day], [type]: value },
      },
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          profilePhoto: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!profile.name) newErrors.name = "Hospital name is required";
    if (!profile.mobile) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(profile.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!profile.address) newErrors.address = "Address is required";
    if (!profile.latitude) newErrors.latitude = "Latitude is required";
    else if (!/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/.test(profile.latitude))
      newErrors.latitude = "Invalid latitude format";
    if (!profile.longitude) newErrors.longitude = "Longitude is required";
    else if (
      !/^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)|(([-+]?)([\d]{1,2})((\.)(\d+))?)|(([-+]?)([\d]{1,3})((\.)(\d+))?)|180\.0+$/.test(
        profile.longitude
      )
    )
      newErrors.longitude = "Invalid longitude format";
    if (!profile.emergencyContact)
      newErrors.emergencyContact = "Emergency contact is required";
    else if (!/^\d{10}$/.test(profile.emergencyContact))
      newErrors.emergencyContact = "Emergency contact must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await apiClient.put("/api/hospital/profile", profile);
        successToast("Profile updated successfully");
        setIsEditing(false);
      } catch (error) {
        errorToast("Failed to update profile");
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="relative mb-6 flex items-center justify-center">
          <BackButton OnClick={() => navigate("/")} />
          <h2 className="text-3xl font-bold text-green-800">
            Hospital Profile
          </h2>
        </div>
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <img
              src={
                profile.profilePhoto || "/placeholder.svg?height=150&width=150"
              }
              alt="Hospital Profile"
              className="w-32 h-32 rounded-full object-cover border border-green-900"
            />
            {isEditing && (
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-green-600 rounded-full p-2 cursor-pointer"
              >
                <Camera className="text-white" size={20} />
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-green-700"
              >
                Hospital Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hospital
                    className="h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                </div>
                <FormInput
                  type="text"
                  name="name"
                  id="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder="Enter hospital name"
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <FormInput
                  type="email"
                  name="email"
                  id="email"
                  value={profile.email}
                  disabled={true}
                  className="pl-10"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-green-700"
              >
                Mobile Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone
                    className="h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                </div>
                <FormInput
                  type="tel"
                  name="mobile"
                  id="mobile"
                  value={profile.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder="Enter mobile number"
                />
              </div>
              {errors.mobile && (
                <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="emergencyContact"
                className="block text-sm font-medium text-green-700"
              >
                Emergency Contact
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AlertCircle
                    className="h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                </div>
                <FormInput
                  type="tel"
                  name="emergencyContact"
                  id="emergencyContact"
                  value={profile.emergencyContact}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder="Enter emergency contact number"
                />
              </div>
              {errors.emergencyContact && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.emergencyContact}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-green-700"
            >
              Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                <MapPin className="h-5 w-5 text-green-500" aria-hidden="true" />
              </div>
              <textarea
                name="address"
                id="address"
                rows={3}
                value={profile.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter hospital address"
              />
            </div>
            {errors.address && (
              <p className="mt-2 text-sm text-red-600">{errors.address}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="latitude"
                className="block text-sm font-medium text-green-700"
              >
                Latitude
              </label>
              <FormInput
                type="text"
                name="latitude"
                id="latitude"
                value={profile.latitude}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter latitude"
              />
              {errors.latitude && (
                <p className="mt-2 text-sm text-red-600">{errors.latitude}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="longitude"
                className="block text-sm font-medium text-green-700"
              >
                Longitude
              </label>
              <FormInput
                type="text"
                name="longitude"
                id="longitude"
                value={profile.longitude}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter longitude"
              />
              {errors.longitude && (
                <p className="mt-2 text-sm text-red-600">{errors.longitude}</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-green-700 mb-3">
              Working Hours
            </h3>
            {Object.entries(profile.workingHours).map(([day, hours]) => (
              <div key={day} className="flex items-center space-x-2 mb-2">
                <span className="w-24 text-sm text-green-700">{day}</span>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <div className="relative">
                    <Clock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                      size={18}
                    />
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "open", e.target.value)
                      }
                      disabled={!isEditing}
                      className="pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="relative">
                    <Clock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                      size={18}
                    />
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "close", e.target.value)
                      }
                      disabled={!isEditing}
                      className="pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-3">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center  px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalProfile;
