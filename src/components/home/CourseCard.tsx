import React from "react";

export default function ({ name }: { name: string }) {
  return (
    <div className="bg-[#16192C] h-[80%] w-[27%] rounded-2xl flex justify-around flex-col text-white">
      <div className="flex justify-center items-center h-[50%]">Telco</div>

      <div className="flex justify-center items-center h-[50%]">
        <h3>{name}</h3>
      </div>

      <div className="flex justify-center items-center h-[50%]">
        <button className="bg-white text-[#16192C] border-none rounded-lg h-[8vh] px-8 py-4 font-bold cursor-pointer">
          Explore
        </button>
      </div>
    </div>
  );
}
