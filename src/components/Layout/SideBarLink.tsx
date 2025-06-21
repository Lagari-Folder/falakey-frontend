import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBarLink = ({
  title,
  route,
  element,
}: {
  title: string;
  route: string;
  element: React.ReactElement;
}) => {
  const [hoverState, setHoverState] = useState(false);

  return (
    <NavLink
      to={route}
      end
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      className={({ isActive }) =>
        `w-full relative flex items-center justify-center bg-white z-50  ${
          isActive ? "text-[#b17ece]" : "text-black"
        }`
      }
    >
      <div className="!text-[20px]">{element}</div>
      <div
        style={{
          width: "max-content",
        }}
        className={`absolute ${
          hoverState ? "left-[60px] " : "left-0 opacity-0 "
        } top-0 bottom-0 transition-all duration-300 text-[14px] font-semibold rounded-r-md  px-4 bg-black  text-white flex items-center justify-center`}
      >
        {title}
      </div>
    </NavLink>
  );
};
export default SideBarLink;
