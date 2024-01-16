import React, { useState } from "react";
import { FiHome } from "react-icons/fi";

export default function NavBar() {
  const [active, setActive] = useState(0);
  return (
    <div className="absolute w-full bottom-0 h-20 ring flex gap-1 overflow-hidden">
      <div
        className="flex-1 border-t-2 flex justify-center items-center relative"
        onClick={() => setActive(0)}
      >
        <FiHome
          className={`h-8 w-8 transition-all ease-in-out ${
            active === 0 && "stroke-pink-400 scale-110"
          } `}
        />
        <span
          className={`absolute bottom-0 h-8 w-full bg-pink-400 rounded-t-full -mb-2 transition-all ease-in-out duration-300 ${
            active === 0 ? "-mb-6 opacity-100" : "-mb-8 opacity-0"
          }`}
        />
      </div>

      <div
        className="flex-1 border-t-2 flex justify-center items-center relative"
        onClick={() => setActive(1)}
      >
        <FiHome
          className={`h-8 w-8 transition-all ease-in-out ${
            active === 1 && "stroke-pink-400 scale-110"
          } `}
        />
        <span
          className={`absolute bottom-0 h-8 w-full bg-pink-400 rounded-t-full -mb-2 transition-all ease-in-out duration-300 ${
            active === 1 ? "-mb-6 opacity-100" : "-mb-8 opacity-0"
          }`}
        />
      </div>

      <div
        className="flex-1 border-t-2 flex justify-center items-center relative"
        onClick={() => setActive(2)}
      >
        <FiHome
          className={`h-8 w-8 transition-all ease-in-out ${
            active === 2 && "stroke-pink-400 scale-110"
          } `}
        />
        <span
          className={`absolute bottom-0 h-8 w-full bg-pink-400 rounded-t-full -mb-2 transition-all ease-in-out duration-300 ${
            active === 2 ? "-mb-6 opacity-100" : "-mb-8 opacity-0"
          }`}
        />
      </div>

      <div
        className="flex-1 border-t-2 flex justify-center items-center relative"
        onClick={() => setActive(3)}
      >
        <FiHome
          className={`h-8 w-8 transition-all ease-in-out ${
            active === 3 && "stroke-pink-400 scale-110"
          } `}
        />
        <span
          className={`absolute bottom-0 h-8 w-full bg-pink-400 rounded-t-full -mb-2 transition-all ease-in-out duration-300 ${
            active === 3 ? "-mb-6 opacity-100" : "-mb-8 opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
