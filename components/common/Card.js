import React from "react";

function Card({ data }) {
  return (
    <div className="w-full lg:max-w-full lg:flex">
      <img src={data.image[0]} className="object-cover sm:w-56 lg:h-56" />
      {/* <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${data.image[0]})` }} title="Mountain"></div> */}
      <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{data.title}</div>
          <p className="text-gray-700 text-base">{data.description}</p>
          {data?.price?.map((prices) => (
            <p>
              {prices.type}: {prices.price}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
