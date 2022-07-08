import { useState } from "react";
import ImageSelector from "../common/ImageSelector";
import MultiInput from "../common/MultiInput";
import TextArea from "../common/TextArea";
import TextField from "../common/TextField";
import RadioSelect from "../common/RadioSelect";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../common/Loader/Loader";
import { addProducts, productLoading } from "../redux/products/products";
import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

interface PizzaVarities {
  large: number;
  medium: number;
  small: number;
}

interface ValueObject {
  pizza_name: string;
  pizza_description: string;
  pizza_images: Array<File>;
  pizza_varities: PizzaVarities;
  pizza_type: string;
}

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
  const [value, setValue] = useState<ValueObject>({
    pizza_name: "",
    pizza_description: "",
    pizza_images: [],
    pizza_varities: {
      large: 0,
      medium: 0,
      small: 0,
    },
    pizza_type: "",
  });

  const loading = useSelector(productLoading);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const add_product = dispatch(addProducts(value))
      .then(unwrapResult)
      // .then((result: any) => result._id && router.push(`/p/${result._id}`));
      .then((result: any) => result._id && router.push(`/`));
  };

  return (
    <>
      <Loader isLoading={loading} />
      <div>
        <div className="md:grid md:gap-6 grid place-items-center h-screen">
          <div className="mt-5 md:mt-0 w-full md:w-1/2">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  {input_fields.map((input, index) => (
                    <div key={index}>
                      {input.field == "input" && <TextField name={input.name} required={input.required} type={input.type} slug={input.slug} value={value[input.slug]} onChange={(e: { target: { value: any } }) => setValue({ ...value, [input.slug]: e.target.value })} />}
                      {input.field == "image_array" && <ImageSelector name={input.name} onChange={(e: { target: { files: any } }) => setValue({ ...value, [input.slug]: e.target.files })} slug={input.slug} images={value[input.slug]} />}
                      {input.field == "area" && <TextArea name={input.name} required={input.required} type={input.type} slug={input.slug} value={value[input.slug]} onChange={(e: { target: { value: any } }) => setValue({ ...value, [input.slug]: e.target.value })} />}
                      {input.field == "radio" && <RadioSelect name={input.name} required={input.required} options={input.options} onChange={(val: any) => setValue({ ...value, [input.slug]: val })} />}
                      {input.field == "multi_text" && (
                        <MultiInput
                          name={input.name}
                          required={input.required}
                          type={input.type}
                          slug={input.slug}
                          value={value[input.slug]}
                          options={input.options}
                          onChange={(e: { target: { value: string } }, option: { slug: any }) =>
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
                    </div>
                  ))}
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
