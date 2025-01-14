import React from "react";

const ItemTile = ({ item }) => {
  // console.log(item);
  const { image, name, recipe, price } = item;
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      <div className=" flex justify-center items-start mr-4">
        <img
          className="rounded-tr-full rounded-b-full w-[100px] ring-4 ring-gray-400 shadow-2xl p-1 object-cover bg-gray-200"
          src={image}
          alt=""
        />
      </div>
      <div className="text-start col-span-0 lg:col-span-2">
        <div className="flex justify-between items-center text-[#151515] text-xl font-normal mb-2">
          <h3>{name}</h3>
          <div className="hidden lg:hidden xl:block">-------</div>
          <span className="badge block lg:hidden text-[#BB8506] text-xl font-normal leading-[26px]">
            ${price}
          </span>
        </div>
        <p className="text-[#737373] text-base font-normal leading-[26px]">
          {recipe}
        </p>
      </div>
      <div className="hidden lg:block text-[#BB8506] text-xl font-normal leading-[26px]">
        ${price}
      </div>
    </div>
  );
};

export default ItemTile;
