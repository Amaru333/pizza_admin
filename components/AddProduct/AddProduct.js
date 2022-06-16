import { useState } from "react";
import ImageSelector from "../common/ImageSelector";
import MultiInput from "../common/MultiInput";
import TextArea from "../common/TextArea";
import TextField from "../common/TextField";
import axios from "axios";
import RadioSelect from "../common/RadioSelect";
import { useSelector, useDispatch } from "react-redux";
import { decrement, getValue, increment } from "../redux/counter/counterSlice";
import { SERVER_ROUTE } from "../../routes";

function AddProduct() {
  const input_fields = [
    {
      name: "Name of the pizza",
      slug: "pizza_name",
      field: "input",
      type: "text",
      required: false,
    },
    {
      name: "Ingredients",
      slug: "pizza_description",
      field: "area",
      type: "text",
      required: false,
    },
    {
      name: "Images",
      slug: "pizza_images",
      field: "image_array",
      required: false,
    },
    {
      name: "Varities",
      slug: "pizza_varities",
      field: "multi_text",
      type: "text",
      options: [
        {
          name: "Medium",
          slug: "medium",
          type: "number",
        },
        {
          name: "Small",
          slug: "small",
          type: "number",
        },
        {
          name: "Large",
          slug: "large",
          type: "number",
        },
      ],
      required: false,
    },
    {
      name: "Type",
      slug: "pizza_type",
      field: "radio",
      required: true,
      options: [
        {
          name: "Vegetarian",
          slug: "veg",
        },
        {
          name: "Non-vegetarian",
          slug: "non_veg",
        },
      ],
    },
  ];
  const [value, setValue] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);

  const counterValue = useSelector(getValue);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const uploaders = Array.from(value.pizza_images).map((file, index) => {
      const formData = new FormData();
      formData.append("file", value.pizza_images[index]);
      formData.append("upload_preset", "f6jarqgh");

      return axios.post("https://api.cloudinary.com/v1_1/amaru/image/upload", formData).then((res) => {
        const data = res.data;
        const fileURL = data.secure_url;
        uploadedImages.push(fileURL);
        console.log(data, fileURL);
      });
    });

    axios.all(uploaders).then(() => {
      axios
        .post(`${SERVER_ROUTE}/product/add-product`, {
          pizza_name: value.pizza_name,
          pizza_images: uploadedImages,
          pizza_varities: value.pizza_varities,
          pizza_description: value.pizza_description,
          pizza_type: value.pizza_type,
        })
        .then((res) => {
          console.log(res);
        });
    });
  };

  return (
    <>
      <div>
        {/* <button onClick={() => dispatch(increment())}>Increase</button>
        {counterValue}
        <button onClick={() => dispatch(decrement())}>Decrease</button> */}
        <div className="md:grid md:gap-6 grid place-items-center h-screen">
          <div className="mt-5 md:mt-0 w-full md:w-1/2">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  {input_fields.map((input) => (
                    <>
                      {input.field == "input" && <TextField name={input.name} required={input.required} type={input.type} slug={input.slug} value={value[input.slug]} onChange={(e) => setValue({ ...value, [input.slug]: e.target.value })} />}
                      {input.field == "image_array" && <ImageSelector name={input.name} onChange={(e) => setValue({ ...value, [input.slug]: e.target.files })} slug={input.slug} images={value[input.slug]} />}
                      {input.field == "area" && <TextArea name={input.name} required={input.required} type={input.type} slug={input.slug} value={value[input.slug]} onChange={(e) => setValue({ ...value, [input.slug]: e.target.value })} />}
                      {input.field == "radio" && <RadioSelect name={input.name} required={input.required} options={input.options} onChange={(val) => setValue({ ...value, [input.slug]: val })} />}
                      {input.field == "multi_text" && (
                        <MultiInput
                          name={input.name}
                          required={input.required}
                          type={input.type}
                          slug={input.slug}
                          value={value[input.slug]}
                          options={input.options}
                          onChange={(e, option) =>
                            setValue({
                              ...value,
                              [input.slug]: {
                                ...value[input.slug],
                                [option.slug]: parseInt(e.target.value),
                              },
                            })
                          }
                        />
                      )}
                    </>
                  ))}
                  {/* <div>
                        <label className="block text-sm font-medium text-gray-700">Photo</label>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          <button type="button" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Change
                          </button>
                        </div>
                      </div> */}
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-apptheme-100 hover:bg-apptheme-200 focus:outline-none focus:ring-2 focus:ring-offset-2">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
