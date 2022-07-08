import React from "react";

function RadioSelect({ name, required, options, onChange }) {
  return (
    <fieldset>
      <legend className="contents text-base font-medium text-gray-900">{name}</legend>
      <div className="mt-4 space-y-4">
        <div className="items-center grid grid-cols-3 gap-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input id={option.slug} name="push-notifications" type="radio" className="focus:ring-apptheme-100 h-4 w-4 text-apptheme-200 border-gray-300" onClick={(e) => onChange(e.target.id)} />
              <label htmlFor={option.slug} className="ml-3 block text-sm font-medium text-gray-700">
                {option.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </fieldset>
  );
}

export default RadioSelect;
