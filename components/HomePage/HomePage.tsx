import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, getProducts, productLoading } from "../redux/products/products";
import Card from "../common/Card";
import Loader from "../common/Loader/Loader";

function HomePage() {
  const loading = useSelector(productLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductDetails());
  }, []);
  const product_data = useSelector(getProducts);
  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-2 gap-5 p-5">
      {product_data?.map((product: any, index: React.Key) => (
        <div key={index} className="sm:w-56 lg:w-full col-span-1 shadow-lg rounded-r-lg">
          <Card data={product} />
        </div>
      ))}
      <Loader isLoading={loading} />
    </div>
  );
}

export default HomePage;
