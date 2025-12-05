import { useState, useEffect } from "react";

interface TextareaProps {
  errors: any;
  register: any;
  name: string;
  rowsNum: number;
  placeholder:string;
}

const Textarea = ({ errors, register, name, rowsNum, placeholder }: TextareaProps) => {
  const [apiErr, setApiErr] = useState<string | null>(null);

  // Read API error from sessionStorage on mount and when name changes
  useEffect(() => {
    const storedErr = sessionStorage.getItem(`api-error-${name}`);
    setApiErr(storedErr);
  }, [name]);

  const handleChange = () => {
    setApiErr(null);
    sessionStorage.removeItem(`api-error-${name}`);
  };

  // Use apiErr if available, otherwise use form validation error
  const displayError = apiErr || errors?.[name]?.message;

  return (
    <>
      <textarea
        {...register(name)}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:border-transparent text-gray-900 placeholder-gray-500 ${
          displayError
            ? "border-red-500 ring-red-500 bg-red-50 focus:ring-red-500"
            : "border-gray-300 focus:ring-teal-400"
        }`}
        rows={rowsNum}
      />
      {displayError && (
        <p className="text-red-500 text-xs mt-2">{displayError}</p>
      )}
    </>
  );
};

export default Textarea;
