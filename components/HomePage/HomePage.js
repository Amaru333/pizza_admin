import axios from "axios";
import React, { useEffect } from "react";
import { SERVER_ROUTE } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, getProducts } from "../redux/products/products";
import Card from "../common/Card";

function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails());
    // console.log("test");
  }, []);
  const product_data = useSelector(getProducts);
  console.log(product_data, "AAAAAAAAAAA");
  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-2 gap-5">
      {product_data?.map((product, index) => (
        <div key={index} className="sm:w-56 lg:w-full col-span-1 shadow-lg ">
          <Card data={product} />
        </div>
      ))}
    </div>
  );
}

export default HomePage;
