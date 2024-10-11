import React from "react";
import {
  Hospital,
  Users,
  Ambulance,
  Clock,
  Calendar,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

const HospitalHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              {/* <Hospital className="h-8 w-8 text-green-600" /> */}
              <img
                src="./icons/favicon.jpeg"
                alt=""
                className="h-12 w-12 rounded-full border border-green-800"
              />

              <span className="ml-2 text-2xl font-bold text-green-800">
                Hosta
              </span>
            </div>
            <div className="flex items-center">
              <Link
                to="/login"
                className="text-green-600 hover:bg-green-100 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/registration"
                className="ml-4 bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
          Welcome to MediConnect for Hospitals
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Why Join MediConnect?
            </h2>
            <ul className="space-y-2 text-green-600">
              <li className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Increase visibility to potential patients
              </li>
              <li className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Manage appointments efficiently
              </li>
              <li className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Showcase your doctors and specialties
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Display real-time availability
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              How It Works
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-green-600">
              <li>Sign up and create your hospital profile</li>
              <li>Add your doctors and their specialties</li>
              <li>Set consultation hours and working times</li>
              <li>Manage bookings and patient inquiries</li>
              <li>Update your information in real-time</li>
            </ol>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-green-600 mb-6">
            Join MediConnect today and connect with patients looking for quality
            healthcare.
          </p>
          <Link
            to="/signup"
            className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-md text-lg font-medium inline-flex items-center"
          >
            Sign Up Now
            <Hospital className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Features for Hospitals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <Hospital className="h-12 w-12 text-green-600 mb-2" />
              <h3 className="text-lg font-semibold text-green-700 mb-1">
                Hospital Profile
              </h3>
              <p className="text-green-600">
                Showcase your facilities and services
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-green-600 mb-2" />
              <h3 className="text-lg font-semibold text-green-700 mb-1">
                Doctor Management
              </h3>
              <p className="text-green-600">
                Add and manage your medical staff
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Ambulance className="h-12 w-12 text-green-600 mb-2" />
              <h3 className="text-lg font-semibold text-green-700 mb-1">
                Emergency Services
              </h3>
              <p className="text-green-600">
                Highlight your emergency capabilities
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-green-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">MediConnect</h3>
              <p className="text-sm">Connecting Hospitals and Patients</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/about" className="hover:text-green-200">
                About
              </Link>
              <Link to="/contact" className="hover:text-green-200">
                Contact
              </Link>
              <Link to="/privacy" className="hover:text-green-200">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            &copy; {new Date().getFullYear()} MediConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HospitalHomePage;
