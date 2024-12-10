import React, { useState } from "react";
import { Mail, Lock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { BackButton } from "../Components/Commen";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../Components/Axios";

const PasswordReset: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [randomNumber, setReandomNumber] = useState("");

  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.email) {
      setError("Please enter your email address.");
      return;
    }
    // Simulate sending OTP
    const generateOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setReandomNumber(generateOtp);
    apiClient
      .post(
        "/api/email",
        {
          from: "hostahelthcare@gmail.com",
          to: formData.email.toLowerCase(),
          subject: "Reset Password",
          text: `Otp for reseting your password is ${generateOtp}`,
        },
        { withCredentials: true }
      )
      .then(() => {
        setStep(2);
        setSuccess("OTP sent to your email address.");
      })
      .catch((err) => console.log(err));
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.otp) {
      setError("Please enter the OTP.");
      return;
    }
    // Simulate OTP verification
    if (formData.otp === randomNumber) {
      // In a real app, this would be validated against a server
      setStep(3);
      setSuccess("OTP verified successfully.");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    // Simulate password reset
    apiClient
      .post(
        "/api/hospital/password",
        {
          email: formData.email.toLowerCase(),
          password: formData.newPassword,
        },
        { withCredentials: true }
      )
      .then(() => {
        setStep(4);
        setSuccess("Password reset successfully.");
      })
      .catch((err) => console.log(err));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Send OTP
            </button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Enter OTP
              </label>
              <div className="relative">
                <CheckCircle
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <input
                  type="text"
                  id="otp"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                  className="pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter OTP"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Verify OTP
            </button>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <input
                  type="password"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className="pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter new password"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                  size={18}
                />
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Confirm new password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </form>
        );
      case 4:
        return (
          <div className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
            <h3 className="mt-2 text-xl font-semibold text-green-800">
              Password Reset Successful
            </h3>
            <p className="mt-2 text-green-600">
              Your password has been successfully reset.
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="relative mb-6 flex items-center justify-center">
          <BackButton OnClick={() => navigate("/")} />
          <h2 className="text-3xl font-bold text-green-800">Reset Password</h2>
        </div>
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
            <AlertCircle className="mr-2" size={18} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
            <CheckCircle className="mr-2" size={18} />
            <span>{success}</span>
          </div>
        )}
        {renderStep()}
      </div>
    </div>
  );
};

export default PasswordReset;
