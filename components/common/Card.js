import React from "react";
import { useDispatch } from "react-redux";
import { deleteProducts } from "../redux/products/products";

function Card({ data }) {
  const dispatch = useDispatch();
  const deleteItem = () => {
    dispatch(deleteProducts(data._id));
  };
  return (
    <div className="w-full lg:max-w-full lg:flex">
      <img src={data.image[0]} className="object-cover sm:w-56 lg:h-56 rounded-l-lg" />
      {/* <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${data.image[0]})` }} title="Mountain"></div> */}
      <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r pt-4 pl-4 pr-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{data.title}</div>
          <p className="text-gray-700 text-base">{data.description}</p>
          {data?.price?.map((prices, index) => (
            <p key={index}>
              {prices.type}: {prices.price}
            </p>
          ))}
          <div className="bg-apptheme-100 w-24 text-center p-1 text-white rounded cursor-pointer hover:bg-apptheme-200 transition-colors" onClick={deleteItem}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
