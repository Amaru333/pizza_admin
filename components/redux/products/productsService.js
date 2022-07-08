import axios from "axios";
import { SERVER_ROUTE } from "../../../routes";

//Get products
const getProducts = async () => {
  const response_data = await axios.get(`/product`);
  return response_data.data;
};

//Add product
const addProduct = async (value) => {
  let uploadedImages = [];
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

  const response_details = await axios.all(uploaders).then(async () => {
    const response_data = await axios.post(`/product/add-product`, {
      pizza_name: value.pizza_name,
      pizza_images: uploadedImages,
      pizza_varities: value.pizza_varities,
      pizza_description: value.pizza_description,
      pizza_type: value.pizza_type,
    });
    return response_data;
  });

  return response_details.data;
};

//Delete product
const deleteProduct = async (id) => {
  const response_data = await axios.delete(`/product/${id}`);
  return response_data;
};

const productsService = {
  getProducts,
  addProduct,
  deleteProduct,
};

export default productsService;
