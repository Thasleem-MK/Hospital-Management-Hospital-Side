import React, { useState } from "react";
import {
  Hospital,
  Mail,
  Phone,
  MapPin,
  Lock,
  CheckCircle,
  X,
  Clock,
  Crosshair,
} from "lucide-react";
import { BackButton, FormInput } from "../Components/Commen";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../Components/Axios";
import { errorToast, successToast } from "../Components/Toastify";

interface WorkingHours {
  [key: string]: { open: string; close: string; isHoliday: boolean };
}

const HospitalRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    email: "",
    mobile: "",
    address: "",
    latitude: "",
    longitude: "",
    password: "",
    confirmPassword: "",
  });
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    Monday: { open: "", close: "", isHoliday: false },
    Tuesday: { open: "", close: "", isHoliday: false },
    Wednesday: { open: "", close: "", isHoliday: false },
    Thursday: { open: "", close: "", isHoliday: false },
    Friday: { open: "", close: "", isHoliday: false },
    Saturday: { open: "", close: "", isHoliday: false },
    Sunday: { open: "", close: "", isHoliday: true },
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generateOtp, setGenerateOtp] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleWorkingHoursChange = (
    day: string,
    type: "open" | "close" | "isHoliday",
    value: string | boolean
  ) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Hospital name is required";
    if (formData.type == "") newErrors.type = "Hospital type is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.latitude) newErrors.latitude = "Latitude is required";
    // else if (!/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/.test(formData.latitude))
    //   newErrors.latitude = "Invalid latitude format";
    if (!formData.longitude) newErrors.longitude = "Longitude is required";
    // else if (
    //   !/^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)|(([-+]?)([\d]{1,2})((\.)(\d+))?)|(([-+]?)([\d]{1,3})((\.)(\d+))?)|180\.0+$/.test(
    //     formData.longitude
    //   )
    // )
    //   newErrors.longitude = "Invalid longitude format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (!otpSent) {
        // Simulating OTP send
        const randomSixDigit = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        setGenerateOtp(randomSixDigit);
        await apiClient
          .post(
            "/api/email",
            {
              from: "hostahelthcare@gmail.com",
              to: formData.email,
              subject: "OTP VERIFICATION",
              text: `Otp for Hosta registration is ${randomSixDigit}`,
            },
            { withCredentials: true }
          )
          .then(() => {
            setOtpSent(true);
            setShowOtpPopup(true);
          })
          .catch((err) => console.log(err));
      } else {
        if (otp === generateOtp) {
          await apiClient
            .post(
              "/api/hospital/registration",
              {
                ...formData,
                workingHours,
              },
              { withCredentials: true }
            )
            .then((result) => {
              successToast(result.data.message);
              navigate("/login");
            })
            .catch((err) => {
              errorToast(err.response.data.message);
            });
          setShowOtpPopup(false);
        } else {
          errorToast("Wrong OTP, please try again!");
        }
      }
    }
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
          }));
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          errorToast("Unable to get your location. Please enter manually.");
          setIsGettingLocation(false);
        }
      );
    } else {
      errorToast("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
    }
  };

  const fill24HourTimes = () => {
    const updated24HourTimes = Object.keys(workingHours).reduce((acc, day) => {
      acc[day] = { open: "00:00", close: "23:59", isHoliday: false };
      return acc;
    }, {} as WorkingHours);
    setWorkingHours(updated24HourTimes);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
        <BackButton OnClick={() => navigate("/")} />
        <h2 className="text-3xl font-bold text-green-800 inline-block">
          Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Hospital Name
              </label>
              <div className="relative">
                <Hospital
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <FormInput
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter hospital name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Hospital Type
              </label>
              <div className="relative">
                <Hospital
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select hospital type</option>
                  <option value="Allopathy">Allopathy</option>
                  <option value="Homeopathy">Homeopathy</option>
                  <option value="Ayurveda">Ayurveda</option>
                  <option value="Unani">Unani</option>
                  <option value="Acupuncture">Acupuncture</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {errors.type && (
                <p className="text-red-500 text-xs mt-1">{errors.type}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Mobile Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <FormInput
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Address
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3 text-green-600"
                  size={18}
                />
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter hospital address"
                  rows={5}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
            <div className="md:col-span-1 grid grid-rows-2 gap-4">
              <div>
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium text-green-700 mb-1"
                >
                  Latitude
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                    size={18}
                  />
                  <FormInput
                    type="text"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="Enter latitude"
                  />
                </div>
                {errors.latitude && (
                  <p className="text-red-500 text-xs mt-1">{errors.latitude}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium text-green-700 mb-1"
                >
                  Longitude
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                    size={18}
                  />
                  <FormInput
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="Enter longitude"
                  />
                </div>
                {errors.longitude && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.longitude}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
              disabled={isGettingLocation}
            >
              {isGettingLocation ? (
                "Getting Location..."
              ) : (
                <>
                  <Crosshair className="mr-2" size={18} />
                  Get Current Location
                </>
              )}
            </button>
          </div>
          <div>
            <div className="flex justify-between items-center mb-5">
              <label className="block text-sm font-medium text-gray-700">
                Working Hours
              </label>
              <button
                onClick={fill24HourTimes}
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500"
                type="button"
              >
                Set 24/7 Hours
              </button>
            </div>
            {Object.entries(workingHours).map(([day, hours]) => (
              <div key={day} className="flex items-center space-x-2 mb-2">
                <span className="w-24 text-sm text-green-700">{day}</span>
                <div className="flex-1 grid grid-cols-3 gap-2">
                  <div className="relative">
                    <Clock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                      size={18}
                    />
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "open", e.target.value)
                      }
                      className="pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      disabled={hours.isHoliday}
                    />
                  </div>
                  <div className="relative">
                    <Clock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                      size={18}
                    />
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "close", e.target.value)
                      }
                      className="pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      disabled={hours.isHoliday}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`holiday-${day}`}
                      checked={hours.isHoliday}
                      onChange={(e) =>
                        handleWorkingHoursChange(
                          day,
                          "isHoliday",
                          e.target.checked
                        )
                      }
                      className="mr-2"
                    />
                    <label
                      htmlFor={`holiday-${day}`}
                      className="text-sm text-green-700"
                    >
                      Holiday
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <FormInput
                  type="password"
                  id="password"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <FormInput
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {otpSent ? "Verify OTP & Register" : "Send OTP"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-green-700">
            Have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>

      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setShowOtpPopup(false);
                setOtpSent(false);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Enter OTP
            </h3>
            <p className="text-green-600 mb-4">
              An OTP has been sent to your email address. Please enter it below
              to complete your registration.
            </p>
            <div className="relative">
              <CheckCircle
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                size={18}
              />
              <FormInput
                type="text"
                value={otp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOtp(e.target.value)
                }
                placeholder="Enter OTP"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Verify & Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalRegistration;
