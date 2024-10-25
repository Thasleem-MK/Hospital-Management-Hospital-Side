import React, { useState } from "react";
import {
  Hospital,
  Phone,
  MapPin,
  Clock,
  Camera,
  AlertCircle,
  FileText,
} from "lucide-react";
import { BackButton, FormInput } from "../Components/Commen";
import { apiClient } from "../Components/Axios";
import { errorToast, successToast } from "../Components/Toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHospitalData } from "../Redux/Dashboard";
import { RootState } from "../Redux/Store";

const HospitalProfile: React.FC = () => {
  const dispatch = useDispatch();
  const {
    _id,
    about,
    address,
    email,
    emergencyContact,
    image,
    latitude,
    longitude,
    name,
    phone,
    working_hours,
  } = useSelector((state: RootState) => state.Dashboard);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setHospitalData({ [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleWorkingHoursChange = (
    day: string,
    type: "open" | "close" | "holiday",
    value: string | boolean
  ) => {
    const index = working_hours.findIndex((element) => element.day === day);

    if (index !== -1) {
      // Create a new array with the updated element
      const updatedWorkingHours = working_hours.map((element, i) =>
        i === index
          ? {
              ...element,
              opening_time:
                type === "open"
                  ? value
                  : type === "holiday"
                  ? ""
                  : element.opening_time,
              closing_time:
                type === "close"
                  ? value
                  : type === "holiday"
                  ? ""
                  : element.closing_time,
              is_holiday: type === "holiday" ? value : element.is_holiday,
            }
          : element
      );
      dispatch(setHospitalData({ working_hours: updatedWorkingHours }));
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      console.log(formData);

      await apiClient
        .post(`/api/hospital/profileImage/${_id}`, formData, {
          withCredentials: true,
        })
        .then((result) => {
          console.log(result.data.imageUrl);
          dispatch(setHospitalData({ image: result.data.imageUrl }));
        })
        .catch((err) => console.log("err", err));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await apiClient
      .put(
        `/api/hospital/details/${_id}`,
        {
          name: name,
          email: email,
          mobile: phone,
          address: address,
          latitude: latitude,
          longitude: longitude,
          workingHours: working_hours,
          emergencyContact: emergencyContact,
          about: about,
        },
        { withCredentials: true }
      )
      .then(() => {
        successToast("Profile updated successfully");
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.response.data.message.message);
      });
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="relative mb-6 flex items-center justify-center">
          <BackButton OnClick={() => navigate("/dashboard")} />
          <h2 className="text-3xl font-bold text-green-800">
            Profile
          </h2>
        </div>
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <img
              src={image.imageUrl}
              alt={name}
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
                  value={name}
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
                  value={email}
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
                  name="phone"
                  id="mobile"
                  value={phone}
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
                  value={emergencyContact}
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
                value={address}
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
                value={latitude}
                onChange={handleChange}
                disabled={!isEditing}
                // pattern="/^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)|(([-+]?)([\d]{1,2})((\.)(\d+))?)|(([-+]?)([\d]{1,3})((\.)(\d+))?)|180\.0+$/"
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
                value={longitude}
                onChange={handleChange}
                disabled={!isEditing}
                // pattern="/^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)|(([-+]?)([\d]{1,2})((\.)(\d+))?)|(([-+]?)([\d]{1,3})((\.)(\d+))?)|180\.0+$/"
                placeholder="Enter longitude"
              />
              {errors.longitude && (
                <p className="mt-2 text-sm text-red-600">{errors.longitude}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-green-700"
            >
              About
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                <FileText
                  className="h-5 w-5 text-green-500"
                  aria-hidden="true"
                />
              </div>
              <textarea
                name="about"
                id="about"
                rows={4}
                value={about}
                onChange={handleChange}
                disabled={!isEditing}
                className="pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter a description about your hospital"
              />
            </div>
            {errors.about && (
              <p className="mt-2 text-sm text-red-600">{errors.about}</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium text-green-700 mb-3">
              Working Hours
            </h3>
            {working_hours.map((element) => (
              <div
                key={element.day}
                className="flex items-center space-x-2 mb-2"
              >
                <span className="w-24 text-sm text-green-700">
                  {element.day}
                </span>
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <div className="relative">
                    <Clock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
                      size={18}
                    />
                    <input
                      type="time"
                      value={element.opening_time}
                      onChange={(e) =>
                        handleWorkingHoursChange(
                          element.day,
                          "open",
                          e.target.value
                        )
                      }
                      disabled={!isEditing || element.is_holiday}
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
                      value={element.closing_time}
                      onChange={(e) =>
                        handleWorkingHoursChange(
                          element.day,
                          "close",
                          e.target.value
                        )
                      }
                      disabled={!isEditing || element.is_holiday}
                      className="pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`holiday-${element.day}`}
                      checked={element.is_holiday}
                      onChange={(e) =>
                        handleWorkingHoursChange(
                          element.day,
                          "holiday",
                          e.target.checked
                        )
                      }
                      disabled={!isEditing}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`holiday-${element.day}`}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Holiday
                    </label>
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
