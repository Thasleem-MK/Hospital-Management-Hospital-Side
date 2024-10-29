import { useEffect, useState } from "react";
import {
  Bell,
  Lock,
  LogOut,
  Mail,
  //   Shield,
  Trash2,
  User,
} from "lucide-react";
import { BackButton } from "../Components/Commen";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../Components/Axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { errorToast, successToast } from "../Components/Toastify";
import { DeleteConfirmationDialog } from "../Components/DeleteConfirmation";

// Define types for each component's props
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  htmlFor: string;
  className?: string;
};

type SwitchProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
};

// type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
//   className?: string;
// };

// Custom Button component
const Button = ({ children, className = "", ...props }: ButtonProps) => (
  <button
    className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Custom Input component
const Input = ({ className = "", ...props }: InputProps) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    {...props}
  />
);

// Custom Label component
const Label = ({ children, htmlFor, className = "" }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 ${className}`}
  >
    {children}
  </label>
);

// Custom Switch component
const Switch = ({ id, checked, onChange }: SwitchProps) => (
  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
    <input
      type="checkbox"
      name={id}
      id={id}
      checked={checked}
      onChange={onChange}
      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
    />
    <label
      htmlFor={id}
      className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
        checked ? "bg-green-500" : ""
      }`}
    ></label>
  </div>
);

// Custom Select component
// const Select = ({ children, className = "", ...props }: SelectProps) => (
//   <select
//     className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
//     {...props}
//   >
//     {children}
//   </select>
// );

export default function SettingsPage() {
  const { _id, name, email } = useSelector(
    (state: RootState) => state.Dashboard
  );
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [notifications, setNotifications] = useState<{
    email: boolean;
    sms: boolean;
    push: boolean;
    analytics?: boolean; // Optional for new notification option
  }>({
    email: false,
    sms: false,
    push: false,
  });
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmpassword: "",
  });
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    setProfile({
      name: name,
      email: email,
    });
  }, [name, email]);

  const handleDeleteAccount = async () => {
    await apiClient
      .delete(`/api/hospital/${_id}`,{withCredentials:true})
      .then((result) => {
        localStorage.removeItem("accessToken");
        successToast(result.data.message);
        setShowDeleteConfirmation(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleChange = async (
    e: any,
    setFunction: (value: any) => void,
    values: any
  ) => {
    const name = e.target.name;
    setFunction({ ...values, [name]: e.target.value });
  };

  const handleUpdatePassword = async (e: any) => {
    e.preventDefault();
    if (
      password.newPassword.length < 8 ||
      password.newPassword !== password.confirmpassword
    ) {
      errorToast("Password must contain 8 characters and same");
      return;
    }
    await apiClient
      .put(`/api/hospital/details/${_id}`, {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      })
      .then((result) => {
        successToast(result.data.message);
        setPassword({
          confirmpassword: "",
          currentPassword: "",
          newPassword: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const updateProfile = async (e: any) => {
    e.preventDefault();
    await apiClient
      .put(`/api/hospital/details/${_id}`, {
        name: profile.name,
      })
      .then((result) => successToast(result.data.message))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto p-6 bg-green-50">
      <BackButton OnClick={() => navigate("/dashboard")} />
      <h1 className="text-3xl font-bold text-green-800 mb-6 inline-block">
        Settings
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-700 flex items-center mb-4">
            <User className="mr-2" />
            Profile Information
          </h2>
          <form onSubmit={(e) => updateProfile(e)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={(e) => handleChange(e, setProfile, profile)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={profile.email}
                  disabled={true}
                />
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Update Profile
              </Button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-700 flex items-center mb-4">
            <Lock className="mr-2" />
            Security
          </h2>
          <form onSubmit={(e) => handleUpdatePassword(e)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  name="currentPassword"
                  required
                  value={password.currentPassword}
                  onChange={(e) => handleChange(e, setPassword, password)}
                />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  required
                  name="newPassword"
                  value={password.newPassword}
                  onChange={(e) => handleChange(e, setPassword, password)}
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  name="confirmpassword"
                  required
                  value={password.confirmpassword}
                  onChange={(e) => handleChange(e, setPassword, password)}
                />
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Update Password
              </Button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-700 flex items-center mb-4">
            <Bell className="mr-2" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onChange={() => handleNotificationChange("email")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch
                id="sms-notifications"
                checked={notifications.sms}
                onChange={() => handleNotificationChange("sms")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onChange={() => handleNotificationChange("push")}
              />
            </div>
          </div>
        </div>

        {/* <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-700 flex items-center mb-4">
            <Shield className="mr-2" />
            Privacy
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="data-sharing">Data Sharing</Label>
              <Select id="data-sharing">
                <option value="">Select option</option>
                <option value="all">Share all data</option>
                <option value="limited">Limited sharing</option>
                <option value="none">Do not share</option>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics">Allow Analytics</Label>
              <Switch
                id="analytics"
                checked={notifications.analytics || false}
                onChange={() => handleNotificationChange("analytics")}
              />
            </div>
          </div>
        </div> */}

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-600 flex items-center mb-4">
            <Trash2 className="mr-2" />
            Delete Account
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          {!showDeleteConfirmation ? (
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              Delete Account
            </Button>
          ) : (
            <DeleteConfirmationDialog
              onCancel={() => setShowDeleteConfirmation(false)}
              onConfirm={() => handleDeleteAccount()}
            />
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold text-green-700 flex items-center mb-4">
          <LogOut className="mr-2" />
          Session Management
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Manage your active sessions across different devices.
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <Mail className="mr-2 text-green-600" />
              <span>Current Session</span>
            </div>
            <Button
              className="bg-white text-green-600 border border-green-600 hover:bg-green-50"
              onClick={async () => {
                await apiClient
                  .get("/api/hospital/logout", { withCredentials: true })
                  .then(() => {
                    localStorage.removeItem("accessToken");
                    window.location.href = "/";
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Log Out
            </Button>
          </div>
          {/* <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
            <div className="flex items-center">
              <Key className="mr-2 text-green-600" />
              <span>Other Active Sessions</span>
            </div>
            <Button className="bg-white text-red-600 border border-red-600 hover:bg-red-50">
              Log Out All
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
