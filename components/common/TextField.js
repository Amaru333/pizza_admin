import React from "react";

function TextField({ name, required, type, slug, value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-3 sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700">{name}</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input type={type} value={value || ""} onChange={onChange} required={required} className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300" placeholder={name} />
        </div>
      </div>
    </div>
  );
}

export default TextField;
