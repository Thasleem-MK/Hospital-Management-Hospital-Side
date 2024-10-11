import { toast } from "react-toastify";

export const errorToast = (message: string) => {
  return toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    className: "bg-red-600 text-white px-4 py-2 rounded-md shadow-lg font-bold",
  });
};

export const successToast = (message: string) => {
  return toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    className:
      "bg-green-600 text-white px-4 py-2 rounded-md shadow-lg font-bold",
  });
};

export const infoToast = (message: string) => {
  return toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    className:
      "bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg font-bold",
  });
};