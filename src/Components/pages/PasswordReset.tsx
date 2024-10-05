// import React, { useState } from "react";
// import { Mail, Lock, EyeOff, Eye, AlertCircle, ArrowLeft } from "lucide-react";
// import { Link } from "react-router-dom";

// const PasswordReset: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [showResetPopup, setShowResetPopup] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmitEmail = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!email) {
//       setError("Please enter your email address.");
//       return;
//     }

//     // Simulate sending reset email
//     console.log("Sending reset email to:", email);
//     setShowResetPopup(true);
//   };

//   const handleResetPassword = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     if (newPassword.length < 8) {
//       setError("Password must be at least 8 characters long.");
//       return;
//     }

//     // Simulate password reset
//     console.log("Resetting password for:", email);
//     setSuccess("Password has been successfully reset.");
//     setShowResetPopup(false);
//     setEmail("");
//     setNewPassword("");
//     setConfirmPassword("");
//   };

//   return (
//     <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
//           Reset Password
//         </h2>
//         {error && (
//           <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
//             <AlertCircle className="mr-2" size={18} />
//             <span>{error}</span>
//           </div>
//         )}
//         {success && (
//           <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
//             <AlertCircle className="mr-2" size={18} />
//             <span>{success}</span>
//           </div>
//         )}
//         <form onSubmit={handleSubmitEmail} className="space-y-6">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-green-700 mb-1"
//             >
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail
//                 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
//                 size={18}
//               />
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//           >
//             Send Reset Link
//           </button>
//         </form>
//         <div className="mt-6 text-center">
//           <Link
//             to="/login"
//             className="font-medium text-green-600 hover:text-green-500 flex items-center justify-center"
//           >
//             <ArrowLeft className="mr-2" size={18} />
//             Back to Login
//           </Link>
//         </div>
//       </div>

//       {showResetPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-8 max-w-md w-full">
//             <h3 className="text-2xl font-bold text-green-800 mb-4">
//               Reset Your Password
//             </h3>
//             <form onSubmit={handleResetPassword} className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="newPassword"
//                   className="block text-sm font-medium text-green-700 mb-1"
//                 >
//                   New Password
//                 </label>
//                 <div className="relative">
//                   <Lock
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
//                     size={18}
//                   />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="newPassword"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="pl-10 pr-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     placeholder="Enter new password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-green-700 mb-1"
//                 >
//                   Confirm New Password
//                 </label>
//                 <div className="relative">
//                   <Lock
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
//                     size={18}
//                   />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="confirmPassword"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="pl-10 pr-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                     placeholder="Confirm new password"
//                     required
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//               >
//                 Reset Password
//               </button>
//             </form>
//             <button
//               onClick={() => setShowResetPopup(false)}
//               className="mt-4 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PasswordReset;

import React, { useState } from "react";
import { Mail, Lock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    // Simulate sending OTP
    console.log("Sending OTP to:", email);
    setStep(2);
    setSuccess("OTP sent to your email address.");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
    // Simulate OTP verification
    if (otp === "123456") {
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
    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    // Simulate password reset
    console.log("Resetting password for:", email);
    setStep(4);
    setSuccess("Password reset successfully.");
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
          Reset Password
        </h2>
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