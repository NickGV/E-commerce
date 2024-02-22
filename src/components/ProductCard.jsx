import { useState } from "react";

export const ProductCard = ({ title, price, image, handleAdd,handleRemove }) => {
  const [added, setAdded] = useState(false);

  const clickAdd = () =>{
    handleAdd()
    setAdded(true);
  }

  const clickRemove = () => {
    handleRemove()
    setAdded(false);
  }

  return (
    <div className=" bg-zinc-700 text-gray-200 p-2 mt-4 max-w-50 flex flex-col shadow rounded-lg">
      <div>
        <img src={image} alt="" className="h-40 w-full rounded-lg " />
      </div>
      <div className="flex flex-col justify-between mt-4 h-full">
        <h2 className="text-md">{title}</h2>
        <p className="font-semibold  text-lg">$ {price}</p>
        {added ? (
          <button className="w-full p-2 bg-red-700 text-white rounded-md mt-3" onClick={clickRemove}>
            Remove from Cart
          </button>
        ) : (
          <button className="w-full p-2 bg-slate-500 text-white rounded-md mt-3" onClick={clickAdd}>
            add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
 