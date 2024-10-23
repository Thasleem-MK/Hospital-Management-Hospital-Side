import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BackButton, FormInput } from "../Components/Commen";
import { apiClient } from "../Components/Axios";
import { successToast } from "../Components/Toastify";
import { useDispatch } from "react-redux";
import { setHospitalData } from "../Redux/Dashboard";

const HospitalLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }
    await apiClient
      .post("/api/hospital/login", { ...formData }, { withCredentials: true })
      .then((result) => {
        dispatch(setHospitalData({ _id: result.data.data._id }));
        successToast(result.data.message);
        localStorage.setItem("accessToken", result.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message + ", Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="relative mb-6 flex items-center justify-center">
          <BackButton OnClick={() => navigate("/")} />
          <h2 className="text-3xl font-bold text-green-800">User Login</h2>
        </div>
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
            <AlertCircle className="mr-2" size={18} />
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-green-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                size={18}
              />
              <FormInput
                type="email"
                id="email"
                value={formData.email}
                onChange={(e: any) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
              />
            </div>
          </div>
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
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e: any) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/newpassword"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-green-700">
            Don't have an account?{" "}
            <Link
              to="/registration"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;
