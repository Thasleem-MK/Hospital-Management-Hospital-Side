import { ArrowLeft } from "lucide-react";

export const BackButton = ({ OnClick }: { OnClick: any }) => {
  return (
    <button
      onClick={OnClick}
      className="mr-4 p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors absolute left-0"
    >
      <ArrowLeft className="h-6 w-6" />
    </button>
  );
};

// Form input
export const FormInput = ({
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
}: {
  type?: string;
  id?: string;
  name?: string;
  value: any;
  onChange: any;
  placeholder: string;
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder={placeholder}
      required
    />
  );
};