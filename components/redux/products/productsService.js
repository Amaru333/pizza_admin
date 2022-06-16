import axios from "axios";
import { SERVER_ROUTE } from "../../../routes";

//Get products
const getProducts = async () => {
  const response_data = await axios.get(`${SERVER_ROUTE}/product`);
  return response_data.data;
};

const productsService = {
  getProducts,
};

export default productsService;
