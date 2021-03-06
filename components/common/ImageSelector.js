import React from "react";

function ImageSelector({ name, onChange, slug, images }) {
  const imageList = images?.length;
  //   console.log(images && URL.createObjectURL(images?.[0]), imageList, "SDSSSSSSSSSSSSSS");
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{name}</label>
      {imageList ? (
        <div>
          <div className="grid grid-cols-2 gap-6 mb-2">
            {[...Array(imageList)].map((e, index) => (
              <div className="col-span-1">
                <img src={URL.createObjectURL(images[index])} />
              </div>
            ))}
          </div>
          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-apptheme-100 hover:text-apptheme-200 w-full text-center">
            <span>Upload images</span>
            <input id="file-upload" name="file-upload" type="file" accept="image/png, image/jpeg" multiple className="sr-only" onChange={onChange} />
          </label>
        </div>
      ) : (
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-apptheme-100 hover:text-apptheme-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2">
                <span>Upload images</span>
                <input id="file-upload" name="file-upload" type="file" accept="image/png, image/jpeg" multiple className="sr-only" onChange={onChange} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageSelector;
