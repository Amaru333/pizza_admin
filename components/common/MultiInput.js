import React from "react";

function MultiInput({ name, required, type, slug, value, onChange, options }) {
  return (
    <div className="grid">
      <div>
        <label className="block text-sm font-medium text-gray-700">{name}</label>
        <div className="mt-1 flex items-center">
          {options.map((option, index) => (
            <>
              <p className="block text-sm font-medium text-gray-700">{option.name}:&nbsp;</p>
              <div className="mt-1 relative rounded-md shadow-sm mr-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input type={option.type} value={value?.[option.slug] || ""} onChange={(e) => onChange(e, option)} required={required} className="focus:ring-apptheme-100 focus:border-apptheme-100 flex-1 block w-full rounded-md sm:text-sm border-gray-300 pl-7" />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MultiInput;
