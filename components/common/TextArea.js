import React from "react";

function TextArea({ name, required, type, slug, value, onChange }) {
  return (
    <div>
      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <div className="mt-1">
        <textarea type={type} value={value || ""} onChange={onChange} required={required} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder={name} />
      </div>
    </div>
  );
}

export default TextArea;
